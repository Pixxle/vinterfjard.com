"use client"

interface WorkHistoryCardProps {
  title: string
  company: string
  startDate: string
  endDate: string
  status: "Current" | "Past"
  description?: string
  companyColor?: string
  detailedDescription?: string
  onClick?: () => void
}

export default function WorkHistoryCard({
  title,
  company,
  startDate,
  endDate,
  status,
  description,
  companyColor = "#3178c6", // Default blue color similar to TypeScript
  detailedDescription,
  onClick,
}: WorkHistoryCardProps) {
  return (
    <div
      className="border border-gray-700 rounded-md p-4 bg-[#0d1117] hover:bg-[#161b22] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-blue-400 font-medium hover:underline">
          <a href="#" onClick={(e) => e.preventDefault()}>
            {title}
          </a>
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${status === "Current" ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-300"}`}
        >
          {status}
        </span>
      </div>

      {description && <div className="text-sm text-gray-300 mt-2 mb-4">{description}</div>}

      <div className="flex justify-between items-end mt-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: companyColor }}></span>
          <span className="text-gray-300">{company}</span>
        </div>

        <div className="text-xs text-gray-400">
          {startDate} - {endDate}
        </div>
      </div>
    </div>
  )
}
