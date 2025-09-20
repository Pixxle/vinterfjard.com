// This file provides mock data for when GitHub API access is unavailable

export const mockUserProfile = {
  name: 'Demo User',
  login: 'demo-user',
  bio: 'This is mock GitHub profile data used when the GitHub API token is not configured.',
  company: 'Example Company',
  location: 'Internet',
  websiteUrl: 'https://example.com',
  url: 'https://github.com/demo-user',
  followers: { totalCount: 42 },
  following: { totalCount: 24 },
};

export const mockContributionCalendar = {
  totalContributions: 365,
  weeks: Array.from({ length: 52 }, (_, weekIndex) => ({
    contributionDays: Array.from({ length: 7 }, (_, dayIndex) => ({
      date: new Date(
        Date.now() - (52 - weekIndex) * 7 * 24 * 60 * 60 * 1000 + dayIndex * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
      contributionCount: Math.floor(Math.random() * 5),
      contributionLevel: [
        'NONE',
        'FIRST_QUARTILE',
        'SECOND_QUARTILE',
        'THIRD_QUARTILE',
        'FOURTH_QUARTILE',
      ][Math.floor(Math.random() * 5)],
    })),
  })),
};

export const mockUserActivity = {
  commitContributionsByRepository: [
    {
      repository: {
        name: 'example-repo',
        nameWithOwner: 'demo-user/example-repo',
        url: 'https://github.com/demo-user/example-repo',
      },
      contributions: {
        totalCount: 25,
        nodes: Array.from({ length: 5 }, (_, i) => ({
          occurredAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
          commitCount: Math.floor(Math.random() * 5) + 1,
        })),
      },
    },
  ],
  pullRequestContributions: {
    totalCount: 12,
    nodes: Array.from({ length: 3 }, (_, i) => ({
      pullRequest: {
        title: `Example pull request ${i + 1}`,
        url: `https://github.com/demo-user/example-repo/pull/${i + 1}`,
        state: ['OPEN', 'MERGED', 'CLOSED'][Math.floor(Math.random() * 3)],
        createdAt: new Date(Date.now() - i * 48 * 60 * 60 * 1000).toISOString(),
        repository: {
          nameWithOwner: 'demo-user/example-repo',
          url: 'https://github.com/demo-user/example-repo',
        },
        additions: Math.floor(Math.random() * 100) + 10,
        deletions: Math.floor(Math.random() * 20) + 5,
        comments: {
          totalCount: Math.floor(Math.random() * 5),
        },
      },
    })),
  },
  issueContributions: {
    totalCount: 8,
    nodes: Array.from({ length: 3 }, (_, i) => ({
      issue: {
        title: `Example issue ${i + 1}`,
        url: `https://github.com/demo-user/example-repo/issues/${i + 1}`,
        state: ['OPEN', 'CLOSED'][Math.floor(Math.random() * 2)],
        createdAt: new Date(Date.now() - i * 72 * 60 * 60 * 1000).toISOString(),
        repository: {
          nameWithOwner: 'demo-user/example-repo',
          url: 'https://github.com/demo-user/example-repo',
        },
      },
    })),
  },
};
