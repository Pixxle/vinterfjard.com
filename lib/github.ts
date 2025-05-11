"use server";

import { GITHUB_ACCESS_TOKEN } from "@/lib/env";

const GITHUB_API_URL = "https://api.github.com/graphql";

/**
 * Execute a GraphQL query against the GitHub API
 */
export async function executeGitHubGraphQL<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  if (!GITHUB_ACCESS_TOKEN) {
    throw new Error("GitHub access token is not configured");
  }

  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
  }

  return data.data as T;
}

/**
 * Get user profile data including followers and following counts
 */
export async function getUserProfile(username: string) {
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
