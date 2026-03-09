'use server';

// Import directly from process.env as we are in a server component
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
import { mockUserProfile, mockContributionCalendar, mockUserActivity } from './mock-github-data';

const GITHUB_API_URL = 'https://api.github.com/graphql';

/**
 * Execute a GraphQL query against the GitHub API
 */
export async function executeGitHubGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const requestId = Math.random().toString(36).substring(2, 8);
  const operationName = query.match(/query\s+(\w+)/)?.[1] || 'UnknownOperation';

  console.log(`[GitHub API ${requestId}] Starting ${operationName} request`, {
    variables,
    hasToken: !!GITHUB_ACCESS_TOKEN,
    url: GITHUB_API_URL,
  });

  if (!GITHUB_ACCESS_TOKEN) {
    console.warn(
      `[GitHub API ${requestId}] GitHub access token is not configured. Using mock data or limited API access.`
    );
    // You can either throw an error or return mock data here
    // For now, we'll proceed with the request (which might fail due to API rate limits)
  }

  const startTime = Date.now();

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(GITHUB_ACCESS_TOKEN && {
          Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        }),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    const duration = Date.now() - startTime;
    console.log(`[GitHub API ${requestId}] Request completed in ${duration}ms`, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'x-ratelimit-limit': response.headers.get('x-ratelimit-limit'),
        'x-ratelimit-remaining': response.headers.get('x-ratelimit-remaining'),
        'x-ratelimit-reset': response.headers.get('x-ratelimit-reset'),
        'x-ratelimit-used': response.headers.get('x-ratelimit-used'),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[GitHub API ${requestId}] HTTP Error: ${response.status} ${response.statusText}`,
        {
          errorText,
          duration,
        }
      );

      // If we get a 401 Unauthorized or 403 Forbidden, likely due to missing or invalid token
      if (response.status === 401 || response.status === 403) {
        console.warn(
          `[GitHub API ${requestId}] GitHub API authorization failed. Please check your GITHUB_ACCESS_TOKEN in .env.local`
        );
        // Return a minimal mock object instead of throwing
        return {} as T;
      }

      // For other errors like rate limits (429), we might want to handle differently
      if (response.status === 429) {
        console.warn(
          `[GitHub API ${requestId}] GitHub API rate limit exceeded. Using minimal functionality.`
        );
        return {} as T;
      }

      throw new Error(`GitHub API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log(`[GitHub API ${requestId}] Response parsed successfully`, {
      hasData: !!data.data,
      hasErrors: !!data.errors,
      dataKeys: data.data ? Object.keys(data.data) : [],
    });

    if (data.errors) {
      console.error(`[GitHub API ${requestId}] GraphQL Errors:`, data.errors);
      // Return empty data rather than throwing
      return {} as T;
    }

    console.log(`[GitHub API ${requestId}] Request successful`);
    return data.data as T;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[GitHub API ${requestId}] Request failed after ${duration}ms:`, error);
    throw error;
  }
}

/**
 * Get user profile data including followers and following counts
 */
export async function getUserProfile(username: string) {
  console.log(`[getUserProfile] Fetching profile for user: ${username}`);

  // If no GitHub token is available, return mock data
  if (!GITHUB_ACCESS_TOKEN) {
    console.log(`[getUserProfile] Using mock GitHub profile data (no token available)`);
    return mockUserProfile;
  }

  const query = `
    query GetUserProfile($username: String!) {
      user(login: $username) {
        name
        login
        bio
        company
        location
        websiteUrl
        url
        followers {
          totalCount
        }
        following {
          totalCount
        }
      }
    }
  `;

  const data = await executeGitHubGraphQL<{
    user: {
      name: string;
      login: string;
      bio: string;
      company: string;
      location: string;
      websiteUrl: string;
      url: string;
      followers: { totalCount: number };
      following: { totalCount: number };
    };
  }>(query, { username });

  console.log(`[getUserProfile] Profile data retrieved for ${username}`, {
    hasUser: !!data.user,
    name: data.user?.name,
    followers: data.user?.followers?.totalCount,
    following: data.user?.following?.totalCount,
  });

  return data.user;
}

/**
 * Get user contribution data for the contribution graph
 */
export async function getUserContributions(username: string) {
  console.log(`[getUserContributions] Fetching contributions for user: ${username}`);

  // If no GitHub token is available, return mock data
  if (!GITHUB_ACCESS_TOKEN) {
    console.log(`[getUserContributions] Using mock GitHub contribution data (no token available)`);
    return mockContributionCalendar;
  }

  // Get the date from 1 year ago, normalized to midnight UTC so the fetch
  // cache key stays stable throughout the day (avoids cache-busting on every call)
  const fromDate = new Date();
  fromDate.setFullYear(fromDate.getFullYear() - 1);
  fromDate.setUTCHours(0, 0, 0, 0);
  const fromDateString = fromDate.toISOString();

  console.log(`[getUserContributions] Fetching contributions from ${fromDateString}`);

  const query = `
    query GetUserContributions($username: String!, $from: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const data = await executeGitHubGraphQL<{
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }>;
          }>;
        };
      };
    };
  }>(query, { username, from: fromDateString });

  const contributionData = data.user.contributionsCollection.contributionCalendar;
  console.log(`[getUserContributions] Contribution data retrieved for ${username}`, {
    totalContributions: contributionData?.totalContributions,
    weeksCount: contributionData?.weeks?.length,
    dateRange: `${fromDateString} to ${new Date().toISOString()}`,
  });

  return contributionData;
}

// Add this new function to fetch user activity data

/**
 * Get user's recent activity (commits, PRs, issues)
 */
export async function getUserActivity(username: string) {
  console.log(`[getUserActivity] Fetching activity for user: ${username}`);

  // If no GitHub token is available, return mock data
  if (!GITHUB_ACCESS_TOKEN) {
    console.log(`[getUserActivity] Using mock GitHub activity data (no token available)`);
    return mockUserActivity;
  }

  const query = `
      query GetUserActivity($username: String!) {
        user(login: $username) {
          contributionsCollection {
            commitContributionsByRepository(maxRepositories: 10) {
              repository {
                name
                nameWithOwner
                url
              }
              contributions(first: 10, orderBy: {field: OCCURRED_AT, direction: DESC}) {
                totalCount
                nodes {
                  occurredAt
                  commitCount
                }
              }
            }
            pullRequestContributions(first: 10, orderBy: {direction: DESC}) {
              totalCount
              nodes {
                pullRequest {
                  title
                  url
                  state
                  createdAt
                  repository {
                    nameWithOwner
                    url
                  }
                  additions
                  deletions
                  comments {
                    totalCount
                  }
                }
              }
            }
            issueContributions(first: 10, orderBy: {direction: DESC}) {
              totalCount
              nodes {
                issue {
                  title
                  url
                  state
                  createdAt
                  repository {
                    nameWithOwner
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

  const data = await executeGitHubGraphQL<{
    user: {
      contributionsCollection: {
        commitContributionsByRepository: Array<{
          repository: {
            name: string;
            nameWithOwner: string;
            url: string;
          };
          contributions: {
            totalCount: number;
            nodes: Array<{
              occurredAt: string;
              commitCount: number;
            }>;
          };
        }>;
        pullRequestContributions: {
          totalCount: number;
          nodes: Array<{
            pullRequest: {
              title: string;
              url: string;
              state: string;
              createdAt: string;
              repository: {
                nameWithOwner: string;
                url: string;
              };
              additions: number;
              deletions: number;
              comments: {
                totalCount: number;
              };
            };
          }>;
        };
        issueContributions: {
          totalCount: number;
          nodes: Array<{
            issue: {
              title: string;
              url: string;
              state: string;
              createdAt: string;
              repository: {
                nameWithOwner: string;
                url: string;
              };
            };
          }>;
        };
      };
    };
  }>(query, { username });

  const activityData = data.user.contributionsCollection;
  console.log(`[getUserActivity] Activity data retrieved for ${username}`, {
    commitRepos: activityData?.commitContributionsByRepository?.length,
    totalPRs: activityData?.pullRequestContributions?.totalCount,
    totalIssues: activityData?.issueContributions?.totalCount,
    recentPRs: activityData?.pullRequestContributions?.nodes?.length,
    recentIssues: activityData?.issueContributions?.nodes?.length,
  });

  return activityData;
}
