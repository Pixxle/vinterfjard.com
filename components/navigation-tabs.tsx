"use client";

interface NavigationTabsProps {
  contributions: number | string;
}

export default function NavigationTabs({ contributions }: NavigationTabsProps) {
  return (
    <div className="border-b border-gray-700 mb-6">
      <nav className="flex overflow-x-auto">
        <a
          href="#overview"
          className="px-4 py-2 border-b-2 border-[#f78166] font-medium"
        >
          Overview
        </a>
        <a
          href="#experience"
          className="px-4 py-2 text-gray-400 hover:text-gray-200"
        >
          Experience{" "}
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-700">
            7
          </span>
        </a>
        <a
          href="#contributions"
          className="px-4 py-2 text-gray-400 hover:text-gray-200"
        >
          Contributions{" "}
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-700">
            {contributions}
          </span>
        </a>
        <a
          href="#projects"
          className="px-4 py-2 text-gray-400 hover:text-gray-200"
        >
          Projects{" "}
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-700">
            2
          </span>
        </a>
      </nav>
    </div>
  );
}
