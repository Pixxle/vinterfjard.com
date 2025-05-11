import { GitPullRequest, GitCommit, GitGraphIcon as GitIssueOpened, Calendar } from "lucide-react"

export default function ActivityTimeline() {
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
            <h4 className="text-sm font-medium">Created 4 commits in 1 repository</h4>
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              <span>May 3</span>
            </div>
          </div>
          <div className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]">
            <div className="flex items-center text-sm">
              <span className="text-blue-400 hover:underline">Pixole/vinterfjard.com</span>
              <span className="ml-auto text-gray-400 text-xs">4 commits</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: "70%" }}></div>
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
              Created a pull request in refined-github/refined-github that received 7 comments
            </h4>
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              <span>May 3</span>
            </div>
          </div>
          <div className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]">
            <div className="flex items-center text-sm">
              <GitPullRequest className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-blue-400 hover:underline">bugs-tab - Support Bug type</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              <p>
                Closes #8297 Not the best at writing regexp, so would appreciate suggestions on how to improve it if
                possible, but all existing tests on queryParts...
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
            <h4 className="text-sm font-medium">Opened 1 other pull request in 1 repository</h4>
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              <span>May 3</span>
            </div>
          </div>
          <div className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]">
            <div className="flex items-center text-sm">
              <span className="text-blue-400 hover:underline">Pixole/vinterfjard.com</span>
              <div className="ml-auto flex items-center text-xs bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full">
                <span>1 merged</span>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex items-center">
                <GitPullRequest className="w-4 h-4 mr-2 text-purple-500" />
                <span className="text-blue-400 hover:underline">
                  Refactor terminal initial message to use constants and simplify ASCII...
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
            <h4 className="text-sm font-medium">Opened 1 issue in 1 repository</h4>
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              <span>May 3</span>
            </div>
          </div>
          <div className="mt-2 p-3 border border-gray-700 rounded-md bg-[#161b22]">
            <div className="flex items-center text-sm">
              <span className="text-blue-400 hover:underline">Pixole/vinterfjard.com</span>
              <div className="ml-auto flex items-center text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded-full">
                <span>1 closed</span>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex items-center">
                <GitIssueOpened className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-blue-400 hover:underline">Display ascii art if screensize is big enough</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
