"use client"

import { useEffect, useState } from "react"

type ContributionLevel = 0 | 1 | 2 | 3 | 4
type ContributionDay = {
  date: string
  count: number
  level: ContributionLevel
}

interface ContributionGraphProps {
  contributions: {
    totalContributions: number
    weeks: Array<{
      contributionDays: Array<{
        date: string
        contributionCount: number
        contributionLevel: string
      }>
    }>
  }
}

export default function ContributionGraph({ contributions }: ContributionGraphProps) {
  const [contributionData, setContributionData] = useState<ContributionDay[]>([])
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const displayDays = ["Mon", "Wed", "Fri"] // Only display these days

  useEffect(() => {
    // Transform the GitHub contribution data into our format
    const transformedData: ContributionDay[] = []

    if (contributions?.weeks) {
      // Sort weeks to ensure oldest first (left to right)
      const sortedWeeks = [...contributions.weeks].sort((a, b) => {
        return new Date(a.contributionDays[0].date).getTime() - new Date(b.contributionDays[0].date).getTime()
      })

      sortedWeeks.forEach((week) => {
        // Sort days within each week to ensure correct day order (Sunday to Saturday)
        const sortedDays = [...week.contributionDays].sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return dateA.getDay() - dateB.getDay()
        })

        sortedDays.forEach((day) => {
          // Convert GitHub's contribution level to our numeric format
          let level: ContributionLevel = 0
          switch (day.contributionLevel) {
            case "NONE":
              level = 0
              break
            case "FIRST_QUARTILE":
              level = 1
              break
            case "SECOND_QUARTILE":
              level = 2
              break
            case "THIRD_QUARTILE":
              level = 3
              break
            case "FOURTH_QUARTILE":
              level = 4
              break
          }

          transformedData.push({
            date: day.date,
            count: day.contributionCount,
            level,
          })
        })
      })
    }

    setContributionData(transformedData)
  }, [contributions])

  const getColorForLevel = (level: ContributionLevel) => {
    switch (level) {
      case 0:
        return "bg-[#161b22]"
      case 1:
        return "bg-[#0e4429]"
      case 2:
        return "bg-[#006d32]"
      case 3:
        return "bg-[#26a641]"
      case 4:
        return "bg-[#39d353]"
    }
  }

  // Format date for tooltip
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="rounded-md border border-gray-700 bg-[#0d1117] p-4">
      <div className="flex text-xs text-gray-400 mb-2 justify-between">
        {months.map((month, i) => (
          <div key={i}>{month}</div>
        ))}
      </div>

      <div className="flex">
        <div className="flex flex-col justify-between text-xs text-gray-400 mr-2 h-[104px]">
          {days.map((day, i) => (
            <div key={i} className="h-3 flex items-center">
              {displayDays.includes(day) ? day : ""}
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="grid grid-rows-7 grid-flow-col gap-1">
            {Array.from({ length: 7 * 52 }).map((_, i) => {
              // Calculate the corresponding day from the contributionData
              // This is a simplified approach - in a real implementation, you'd map actual dates
              const day = contributionData[i] || { date: "", count: 0, level: 0 as ContributionLevel }

              return (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${getColorForLevel(day.level)}`}
                  title={day.date ? `${day.count} contributions on ${formatDate(day.date)}` : "No contributions"}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mt-2 text-xs text-gray-400">
        <span className="mr-2">Less</span>
        <div className={`w-3 h-3 rounded-sm bg-[#161b22]`}></div>
        <div className={`w-3 h-3 rounded-sm bg-[#0e4429] ml-1`}></div>
        <div className={`w-3 h-3 rounded-sm bg-[#006d32] ml-1`}></div>
        <div className={`w-3 h-3 rounded-sm bg-[#26a641] ml-1`}></div>
        <div className={`w-3 h-3 rounded-sm bg-[#39d353] ml-1`}></div>
        <span className="ml-2">More</span>
      </div>
    </div>
  )
}
