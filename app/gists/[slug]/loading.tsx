export default function GistLoading() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      {/* Sidebar skeleton */}
      <div className="w-full shrink-0 md:w-[296px]">
        <div className="animate-pulse space-y-4">
          <div className="h-[296px] w-[296px] rounded-full bg-gray-800" />
          <div className="h-6 w-3/4 rounded bg-gray-800" />
          <div className="h-4 w-1/2 rounded bg-gray-800" />
          <div className="h-4 w-full rounded bg-gray-800" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex-1">
        <div className="animate-pulse space-y-6">
          {/* Back button */}
          <div className="h-5 w-20 rounded bg-gray-800" />

          {/* Title */}
          <div className="space-y-4 border-b border-gray-700 pb-6">
            <div className="h-8 w-2/3 rounded bg-gray-800" />
            <div className="flex gap-4">
              <div className="h-4 w-32 rounded bg-gray-800" />
              <div className="h-4 w-16 rounded-full bg-gray-800" />
            </div>
          </div>

          {/* Content lines */}
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-gray-800" />
            <div className="h-4 w-5/6 rounded bg-gray-800" />
            <div className="h-4 w-4/6 rounded bg-gray-800" />
            <div className="h-4 w-full rounded bg-gray-800" />
            <div className="h-4 w-3/4 rounded bg-gray-800" />
            <div className="h-4 w-5/6 rounded bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
