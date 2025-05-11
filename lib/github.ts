"use server";

// Import directly from process.env as we are in a server component
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
import {
  mockUserProfile,
  mockContributionCalendar,
  mockUserActivity,
} from "./mock-github-data";

const GITHUB_API_URL = "https://api.github.com/graphql";

/**
 * Execute a GraphQL query against the GitHub API
 */
export async function executeGitHubGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!GITHUB_ACCESS_TOKEN) {
    console.warn(
      "GitHub access token is not configured. Using mock data or limited API access."
    );
    // You can either throw an error or return mock data here
    // For now, we'll proceed with the request (which might fail due to API rate limits)
  }

  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(GITHUB_ACCESS_TOKEN && {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      }),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`GitHub API error: ${response.status} ${errorText}`);

    // If we get a 401 Unauthorized or 403 Forbidden, likely due to missing or invalid token
    if (response.status === 401 || response.status === 403) {
      console.warn(
        "GitHub API authorization failed. Please check your GITHUB_ACCESS_TOKEN in .env.local"
      );
      // Return a minimal mock object instead of throwing
      return {} as T;
    }

    // For other errors like rate limits (429), we might want to handle differently
    if (response.status === 429) {
      console.warn(
        "GitHub API rate limit exceeded. Using minimal functionality."
      );
      return {} as T;
    }

    throw new Error(`GitHub API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  if (data.errors) {
    console.error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
    // Return empty data rather than throwing
    return {} as T;
  }

  return data.data as T;
}

/**
 * Get user profile data including followers and following counts
 */
export async function getUserProfile(username: string) {
  // If no GitHub token is available, return mock data
  if (!GITHUB_ACCESS_TOKEN) {
    console.log("Using mock GitHub profile data (no token available)");
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

  return data.user;
}

/**
 * Get user contribution data for the contribution graph
 */
export async function getUserContributions(username: string) {
  // If no GitHub token is available, return mock data
  if (!GITHUB_ACCESS_TOKEN) {
    console.log("Using mock GitHub contribution data (no token available)");
    return mockContributionCalendar;
  }

  // Get the date from 1 year ago
  const fromDate = new Date();
  fromDate.setFullYear(fromDate.getFullYear() - 1);
  const fromDateString = fromDate.toISOString(); // Use the full ISO string with time component

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

  return data.user.contributionsCollection.contributionCalendar;
}

// Add this new function to fetch user activity data

/**
 * Get user's recent activity (commits, PRs, issues)
 */
export async function getUserActivity(username: string) {
  // If no GitHub token is available, return mock data
  if (!GITHUB_ACCESS_TOKEN) {
    console.log("Using mock GitHub activity data (no token available)");
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
            contributions(first: 10) {
              totalCount
              nodes {
                occurredAt
                commitCount
              }
            }
          }
          pullRequestContributions(first: 10) {
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
          issueContributions(first: 10) {
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

  return data.user.contributionsCollection;
}
