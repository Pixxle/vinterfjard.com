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

interface ActivityTimelineProps {
  activityData?: GitHubActivityData;
}

export default function ActivityTimeline({
  activityData,
}: ActivityTimelineProps) {
  // If no data is provided, use the static example data
  if (!activityData) {
    return (
      <div className="space-y-6">
        <div className="flex">
          <div className="mr-3 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <GitCommit className="w-4 h-4 text-gray-400" />
            </div>
            <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Created 4 commits in 1 repository
              </h4>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                <span>May 3</span>
              </div>
            </div>
            <div className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]">
              <div className="flex items-center text-sm">
                <span className="text-blue-400 hover:underline">
                  Pixole/vinterfjard.com
                </span>
                <span className="ml-auto text-gray-400 text-xs">4 commits</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the static content remains unchanged */}
        <div className="flex">
          <div className="mr-3 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <GitPullRequest className="w-4 h-4 text-gray-400" />
            </div>
            <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Created a pull request in refined-github/refined-github that
                received 7 comments
              </h4>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                <span>May 3</span>
              </div>
            </div>
            <div className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]">
              <div className="flex items-center text-sm">
                <GitPullRequest className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-blue-400 hover:underline">
                  bugs-tab - Support Bug type
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                <p>
                  Closes #8297 Not the best at writing regexp, so would
                  appreciate suggestions on how to improve it if possible, but
                  all existing tests on queryParts...
                </p>
              </div>
              <div className="mt-2 flex items-center text-xs">
                <div className="flex items-center text-gray-400">
                  <span className="text-red-500">-13</span>
                  <span className="mx-1">+5</span>
                  <span className="ml-2">lines changed</span>
                  <span className="mx-2">•</span>
                  <span>7 comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="mr-3 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <GitPullRequest className="w-4 h-4 text-gray-400" />
            </div>
            <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Opened 1 other pull request in 1 repository
              </h4>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                <span>May 3</span>
              </div>
            </div>
            <div className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]">
              <div className="flex items-center text-sm">
                <span className="text-blue-400 hover:underline">
                  Pixole/vinterfjard.com
                </span>
                <div className="ml-auto flex items-center text-xs bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full">
                  <span>1 merged</span>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <div className="flex items-center">
                  <GitPullRequest className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="text-blue-400 hover:underline">
                    Refactor terminal initial message to use constants and
                    simplify ASCII...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="mr-3 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <GitIssueOpened className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Opened 1 issue in 1 repository
              </h4>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                <span>May 3</span>
              </div>
            </div>
            <div className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]">
              <div className="flex items-center text-sm">
                <span className="text-blue-400 hover:underline">
                  Pixole/vinterfjard.com
                </span>
                <div className="ml-auto flex items-center text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded-full">
                  <span>1 closed</span>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <div className="flex items-center">
                  <GitIssueOpened className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-blue-400 hover:underline">
                    Display ascii art if screensize is big enough
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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

  return (
    <div className="space-y-6">
      {/* Commits Section */}
      {commitContributionsByRepository.length > 0 && (
        <div className="flex">
          <div className="mr-3 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <GitCommit className="w-4 h-4 text-gray-400" />
            </div>
            <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Created{" "}
                {commitContributionsByRepository.reduce(
                  (acc: number, repo: CommitContributionsByRepository) =>
                    acc + repo.contributions.totalCount,
                  0
                )}{" "}
                commits in {commitContributionsByRepository.length}{" "}
                {commitContributionsByRepository.length === 1
                  ? "repository"
                  : "repositories"}
              </h4>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Recent</span>
              </div>
            </div>
            {commitContributionsByRepository.map(
              (repo: CommitContributionsByRepository, index: number) => (
                <div
                  key={index}
                  className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]"
                >
                  <div className="flex items-center text-sm">
                    <a
                      href={repo.repository.url}
                      className="text-blue-400 hover:underline"
                    >
                      {repo.repository.nameWithOwner}
                    </a>
                    <span className="ml-auto text-gray-400 text-xs">
                      {repo.contributions.totalCount} commits
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
              )
            )}
          </div>
        </div>
      )}

      {/* Pull Requests Section */}
      {pullRequestContributions.totalCount > 0 &&
        pullRequestContributions.nodes.length > 0 && (
          <>
            {/* Featured PR */}
            <div className="flex">
              <div className="mr-3 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <GitPullRequest className="w-4 h-4 text-gray-400" />
                </div>
                <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    Created a pull request in{" "}
                    {
                      pullRequestContributions.nodes[0].pullRequest.repository
                        .nameWithOwner
                    }
                    {pullRequestContributions.nodes[0].pullRequest.comments
                      .totalCount > 0 &&
                      ` that received ${pullRequestContributions.nodes[0].pullRequest.comments.totalCount} comments`}
                  </h4>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>
                      {formatDate(
                        pullRequestContributions.nodes[0].pullRequest.createdAt
                      )}
                    </span>
                  </div>
                </div>
                <div className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]">
                  <div className="flex items-center text-sm">
                    <GitPullRequest
                      className={`w-4 h-4 mr-2 ${
                        pullRequestContributions.nodes[0].pullRequest.state ===
                        "MERGED"
                          ? "text-purple-500"
                          : pullRequestContributions.nodes[0].pullRequest
                              .state === "OPEN"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    />
                    <a
                      href={pullRequestContributions.nodes[0].pullRequest.url}
                      className="text-blue-400 hover:underline"
                    >
                      {pullRequestContributions.nodes[0].pullRequest.title}
                    </a>
                  </div>
                  {pullRequestContributions.nodes[0].pullRequest.additions +
                    pullRequestContributions.nodes[0].pullRequest.deletions >
                    0 && (
                    <div className="mt-2 flex items-center text-xs">
                      <div className="flex items-center text-gray-400">
                        <span className="text-red-500">
                          -
                          {
                            pullRequestContributions.nodes[0].pullRequest
                              .deletions
                          }
                        </span>
                        <span className="mx-1">
                          +
                          {
                            pullRequestContributions.nodes[0].pullRequest
                              .additions
                          }
                        </span>
                        <span className="ml-2">lines changed</span>
                        {pullRequestContributions.nodes[0].pullRequest.comments
                          .totalCount > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span>
                              {
                                pullRequestContributions.nodes[0].pullRequest
                                  .comments.totalCount
                              }{" "}
                              comments
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Other PRs if there are more than 1 */}
            {pullRequestContributions.totalCount > 1 && (
              <div className="flex">
                <div className="mr-3 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <GitPullRequest className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">
                      Opened {pullRequestContributions.totalCount - 1} other
                      pull{" "}
                      {pullRequestContributions.totalCount - 1 === 1
                        ? "request"
                        : "requests"}
                    </h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Recent</span>
                    </div>
                  </div>
                  {pullRequestContributions.nodes
                    .slice(1, 3)
                    .map((pr: PullRequestContribution, index: number) => (
                      <div
                        key={index}
                        className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]"
                      >
                        <div className="flex items-center text-sm">
                          <a
                            href={pr.pullRequest.repository.url}
                            className="text-blue-400 hover:underline"
                          >
                            {pr.pullRequest.repository.nameWithOwner}
                          </a>
                          <div className="ml-auto flex items-center text-xs bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full">
                            <span>{pr.pullRequest.state.toLowerCase()}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          <div className="flex items-center">
                            <GitPullRequest
                              className={`w-4 h-4 mr-2 ${
                                pr.pullRequest.state === "MERGED"
                                  ? "text-purple-500"
                                  : pr.pullRequest.state === "OPEN"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            />
                            <a
                              href={pr.pullRequest.url}
                              className="text-blue-400 hover:underline"
                            >
                              {pr.pullRequest.title}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}

      {/* Issues Section */}
      {issueContributions.totalCount > 0 &&
        issueContributions.nodes.length > 0 && (
          <div className="flex">
            <div className="mr-3 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                <GitIssueOpened className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">
                  Opened {issueContributions.totalCount}{" "}
                  {issueContributions.totalCount === 1 ? "issue" : "issues"}
                </h4>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Recent</span>
                </div>
              </div>
              {issueContributions.nodes
                .slice(0, 2)
                .map((issue: IssueContribution, index: number) => (
                  <div
                    key={index}
                    className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]"
                  >
                    <div className="flex items-center text-sm">
                      <a
                        href={issue.issue.repository.url}
                        className="text-blue-400 hover:underline"
                      >
                        {issue.issue.repository.nameWithOwner}
                      </a>
                      <div className="ml-auto flex items-center text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded-full">
                        <span>{issue.issue.state.toLowerCase()}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <div className="flex items-center">
                        <GitIssueOpened
                          className={`w-4 h-4 mr-2 ${
                            issue.issue.state === "CLOSED"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        />
                        <a
                          href={issue.issue.url}
                          className="text-blue-400 hover:underline"
                        >
                          {issue.issue.title}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      {/* Show a message if no activity data is available */}
      {commitContributionsByRepository.length === 0 &&
        pullRequestContributions.totalCount === 0 &&
        issueContributions.totalCount === 0 && (
          <div className="p-4 text-center text-gray-400">
            No recent GitHub activity found.
          </div>
        )}
    </div>
  );
}
