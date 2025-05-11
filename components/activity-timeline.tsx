import {
  GitPullRequest,
  GitCommit,
  GitGraphIcon as GitIssueOpened,
  Calendar,
} from "lucide-react";

// Define types for GitHub data
interface GitHubRepository {
  url: string;
  nameWithOwner: string;
}

interface CommitContributions {
  totalCount: number;
}

interface CommitContributionsByRepository {
  repository: GitHubRepository;
  contributions: CommitContributions;
}

interface Comment {
  totalCount: number;
}

interface PullRequest {
  url: string;
  title: string;
  createdAt: string;
  state: string;
  additions: number;
  deletions: number;
  comments: Comment;
  repository: GitHubRepository;
}

interface PullRequestContribution {
  pullRequest: PullRequest;
}

interface PullRequestContributions {
  totalCount: number;
  nodes: PullRequestContribution[];
}

interface Issue {
  url: string;
  title: string;
  state: string;
  repository: GitHubRepository;
  createdAt?: string;
}

interface IssueContribution {
  issue: Issue;
}

interface IssueContributions {
  totalCount: number;
  nodes: IssueContribution[];
}

interface GitHubActivityData {
  commitContributionsByRepository: CommitContributionsByRepository[];
  pullRequestContributions: PullRequestContributions;
  issueContributions: IssueContributions;
}

// New type for unified activity items
interface ActivityItem {
  type: "commit" | "pullRequest" | "issue";
  date: string;
  data: any;
}

// New type for grouped activity items
interface GroupedActivityItem {
  type: "commit" | "pullRequest" | "issue";
  date: string;
  items: ActivityItem[];
}

interface ActivityTimelineProps {
  activityData?: GitHubActivityData;
}

export default function ActivityTimeline({
  activityData,
}: ActivityTimelineProps) {
  // If no data is provided, display a warning message
  if (!activityData) {
    return (
      <div className="p-4 border border-yellow-600 bg-yellow-900/30 rounded-md">
        <p className="text-yellow-400 text-sm">
          No GitHub activity data available right now.
        </p>
      </div>
    );
  }

  // Process and display real GitHub activity data
  const {
    commitContributionsByRepository,
    pullRequestContributions,
    issueContributions,
  } = activityData;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Combine all activities into a single array with type and date
  const allActivities: ActivityItem[] = [];

  // Add commits (using current date since the API doesn't provide specific dates for commits)
  commitContributionsByRepository.forEach((repo) => {
    allActivities.push({
      type: "commit",
      date: new Date().toISOString(), // Using current date as a fallback
      data: repo,
    });
  });

  // Add pull requests
  pullRequestContributions.nodes.forEach((pr) => {
    allActivities.push({
      type: "pullRequest",
      date: pr.pullRequest.createdAt,
      data: pr,
    });
  });

  // Add issues
  issueContributions.nodes.forEach((issue) => {
    allActivities.push({
      type: "issue",
      date: issue.issue.createdAt || new Date().toISOString(),
      data: issue,
    });
  });

  // Sort all activities by date (most recent first)
  allActivities.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group consecutive activities of the same type
  const groupedActivities: GroupedActivityItem[] = [];

  allActivities.forEach((activity) => {
    const lastGroup = groupedActivities[groupedActivities.length - 1];

    if (lastGroup && lastGroup.type === activity.type) {
      // Add to existing group
      lastGroup.items.push(activity);
    } else {
      // Create new group
      groupedActivities.push({
        type: activity.type,
        date: activity.date,
        items: [activity],
      });
    }
  });

  // Calculate total counts for grouped items
  const getTotalCommits = (items: ActivityItem[]) => {
    return items.reduce((total, item) => {
      const repo = item.data as CommitContributionsByRepository;
      return total + repo.contributions.totalCount;
    }, 0);
  };

  // Helper to format plural text
  const formatPlural = (count: number, singular: string, plural: string) => {
    return count === 1 ? singular : plural;
  };

  return (
    <div className="space-y-6">
      {groupedActivities.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No recent GitHub activity found.
        </div>
      ) : (
        groupedActivities.map((group, index) => {
          const isLastItem = index === groupedActivities.length - 1;

          switch (group.type) {
            case "commit":
              const commitCount = getTotalCommits(group.items);
              const repoCount = group.items.length;

              return (
                <div key={`commit-group-${index}`} className="flex">
                  <div className="mr-3 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <GitCommit className="w-4 h-4 text-gray-400" />
                    </div>
                    {!isLastItem && (
                      <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">
                        Created {commitCount}{" "}
                        {formatPlural(commitCount, "commit", "commits")} in{" "}
                        {repoCount}{" "}
                        {formatPlural(repoCount, "repository", "repositories")}
                      </h4>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Recent</span>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2">
                      {group.items.map((activity, activityIndex) => {
                        const repo =
                          activity.data as CommitContributionsByRepository;
                        return (
                          <div
                            key={`commit-${activityIndex}`}
                            className="p-3 border border-gray-700 rounded-md bg-[#161b22]"
                          >
                            <div className="flex items-center text-sm">
                              <a
                                href={repo.repository.url}
                                className="text-blue-400 hover:underline"
                              >
                                {repo.repository.nameWithOwner}
                              </a>
                              <span className="ml-auto text-gray-400 text-xs">
                                {repo.contributions.totalCount}{" "}
                                {formatPlural(
                                  repo.contributions.totalCount,
                                  "commit",
                                  "commits"
                                )}
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                              <div
                                className="bg-green-500 h-full"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (repo.contributions.totalCount / 10) * 100
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );

            case "pullRequest":
              return (
                <div key={`pr-group-${index}`} className="flex">
                  <div className="mr-3 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <GitPullRequest className="w-4 h-4 text-gray-400" />
                    </div>
                    {!isLastItem && (
                      <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">
                        Created {group.items.length}{" "}
                        {formatPlural(
                          group.items.length,
                          "pull request",
                          "pull requests"
                        )}{" "}
                        across{" "}
                        {
                          new Set(
                            group.items.map(
                              (item) =>
                                item.data.pullRequest.repository.nameWithOwner
                            )
                          ).size
                        }{" "}
                        {formatPlural(
                          new Set(
                            group.items.map(
                              (item) =>
                                item.data.pullRequest.repository.nameWithOwner
                            )
                          ).size,
                          "repository",
                          "repositories"
                        )}
                      </h4>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(group.date)}</span>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2">
                      {group.items.map((activity, activityIndex) => {
                        const pr = activity.data.pullRequest;
                        return (
                          <div
                            key={`pr-${activityIndex}`}
                            className="p-3 border border-gray-700 rounded-md bg-[#161b22]"
                          >
                            <div className="flex items-center text-sm">
                              <GitPullRequest
                                className={`w-4 h-4 mr-2 ${
                                  pr.state === "MERGED"
                                    ? "text-purple-500"
                                    : pr.state === "OPEN"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              />
                              <a
                                href={pr.url}
                                className="text-blue-400 hover:underline"
                              >
                                {pr.title}
                              </a>
                              <span className="ml-2 text-xs text-gray-500">
                                {pr.repository.nameWithOwner}
                              </span>
                            </div>
                            {pr.additions + pr.deletions > 0 && (
                              <div className="mt-2 flex items-center text-xs">
                                <div className="flex items-center text-gray-400">
                                  <span className="text-red-500">
                                    -{pr.deletions}
                                  </span>
                                  <span className="mx-1">+{pr.additions}</span>
                                  <span className="ml-2">lines changed</span>
                                  {pr.comments.totalCount > 0 && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span>
                                        {pr.comments.totalCount}{" "}
                                        {formatPlural(
                                          pr.comments.totalCount,
                                          "comment",
                                          "comments"
                                        )}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );

            case "issue":
              return (
                <div key={`issue-group-${index}`} className="flex">
                  <div className="mr-3 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <GitIssueOpened className="w-4 h-4 text-gray-400" />
                    </div>
                    {!isLastItem && (
                      <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">
                        Opened {group.items.length}{" "}
                        {formatPlural(group.items.length, "issue", "issues")}{" "}
                        across{" "}
                        {
                          new Set(
                            group.items.map(
                              (item) => item.data.issue.repository.nameWithOwner
                            )
                          ).size
                        }{" "}
                        {formatPlural(
                          new Set(
                            group.items.map(
                              (item) => item.data.issue.repository.nameWithOwner
                            )
                          ).size,
                          "repository",
                          "repositories"
                        )}
                      </h4>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(group.date)}</span>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2">
                      {group.items.map((activity, activityIndex) => {
                        const issue = activity.data.issue;
                        return (
                          <div
                            key={`issue-${activityIndex}`}
                            className="p-3 border border-gray-700 rounded-md bg-[#161b22]"
                          >
                            <div className="flex items-center text-sm">
                              <span className="text-blue-400 hover:underline">
                                {issue.repository.nameWithOwner}
                              </span>
                              <div className="ml-auto flex items-center text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded-full">
                                <span>{issue.state.toLowerCase()}</span>
                              </div>
                            </div>
                            <div className="mt-2 text-sm">
                              <div className="flex items-center">
                                <GitIssueOpened
                                  className={`w-4 h-4 mr-2 ${
                                    issue.state === "CLOSED"
                                      ? "text-red-500"
                                      : "text-green-500"
                                  }`}
                                />
                                <a
                                  href={issue.url}
                                  className="text-blue-400 hover:underline"
                                >
                                  {issue.title}
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );

            default:
              return null;
          }
        })
      )}
    </div>
  );
}
