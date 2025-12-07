'use client';

import { useMemo } from 'react';

type ContributionLevel = 0 | 1 | 2 | 3 | 4;
type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

interface ContributionGraphProps {
  contributions: {
    totalContributions: number;
    weeks: Array<{
      contributionDays: Array<{
        date: string;
        contributionCount: number;
        contributionLevel: string;
      }>;
    }>;
  };
}

export default function ContributionGraph({ contributions }: ContributionGraphProps) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const displayDays = ['Mon', 'Wed', 'Fri']; // Only display these days

  const contributionData = useMemo(() => {
    // Calculate the exact date range: from 1 year ago to today
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    oneYearAgo.setDate(oneYearAgo.getDate() + 1); // Start from day after 1 year ago

    // Find the Sunday of the week containing oneYearAgo (to start the grid properly)
    const startDate = new Date(oneYearAgo);
    const dayOfWeek = startDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    startDate.setDate(startDate.getDate() - dayOfWeek);

    // Find the Saturday of the week containing today (to end the grid properly)
    const endDate = new Date(today);
    const endDayOfWeek = endDate.getDay();
    const daysUntilSaturday = 6 - endDayOfWeek; // Saturday = 6
    endDate.setDate(endDate.getDate() + daysUntilSaturday);

    // Calculate total days and create a complete day map
    const totalDays =
      Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const dayMap = new Map<string, ContributionDay>();

    // Process GitHub contribution data
    if (contributions?.weeks) {
      contributions.weeks.forEach(week => {
        week.contributionDays.forEach(day => {
          // Convert GitHub's contribution level to our numeric format
          let level: ContributionLevel = 0;
          switch (day.contributionLevel) {
            case 'NONE':
              level = 0;
              break;
            case 'FIRST_QUARTILE':
              level = 1;
              break;
            case 'SECOND_QUARTILE':
              level = 2;
              break;
            case 'THIRD_QUARTILE':
              level = 3;
              break;
            case 'FOURTH_QUARTILE':
              level = 4;
              break;
          }

          dayMap.set(day.date, {
            date: day.date,
            count: day.contributionCount,
            level,
          });
        });
      });
    }

    // Create the complete grid data with proper alignment
    const transformedData: ContributionDay[] = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < totalDays; i++) {
      const dateString = currentDate.toISOString().split('T')[0];
      const existingData = dayMap.get(dateString);

      if (existingData) {
        transformedData.push(existingData);
      } else {
        // For dates without data (including future dates), create empty entries
        transformedData.push({
          date: dateString,
          count: 0,
          level: 0,
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return transformedData;
  }, [contributions]);

  const getColorForLevel = (level: ContributionLevel) => {
    switch (level) {
      case 0:
        return 'bg-[#161b22]';
      case 1:
        return 'bg-[#0e4429]';
      case 2:
        return 'bg-[#006d32]';
      case 3:
        return 'bg-[#26a641]';
      case 4:
        return 'bg-[#39d353]';
    }
  };

  // Format date for tooltip
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-md border border-gray-700 bg-[#0d1117] p-4">
      <div className="relative mb-2 flex overflow-x-hidden text-xs text-gray-400">
        <div className="absolute right-0 flex justify-between" style={{ minWidth: '100%' }}>
          {months.map((month, i) => (
            <div key={i}>{month}</div>
          ))}
        </div>
      </div>

      <div className="flex overflow-x-hidden">
        <div className="mr-2 flex h-[120px] shrink-0 flex-col justify-between text-xs text-gray-400">
          {days.map((day, i) => (
            <div key={i} className="flex h-3 items-center">
              {displayDays.includes(day) ? day : ''}
            </div>
          ))}
        </div>

        <div className="relative flex-1 overflow-x-hidden">
          <div
            className="absolute right-0 grid grid-flow-col grid-rows-7 gap-1"
            style={{ minWidth: '100%' }}
          >
            {contributionData.map((day, i) => {
              // Check if this date is in the future
              const dayDate = new Date(day.date);
              const today = new Date();
              today.setHours(23, 59, 59, 999); // Set to end of today for comparison
              const isFuture = dayDate > today;

              return (
                <div
                  key={i}
                  className={`h-3 w-3 rounded-sm ${getColorForLevel(
                    day.level
                  )} ${isFuture ? 'opacity-0' : ''}`}
                  title={
                    !isFuture && day.date
                      ? `${day.count} contributions on ${formatDate(day.date)}`
                      : isFuture
                        ? `Future date: ${formatDate(day.date)}`
                        : 'No contributions'
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end text-xs text-gray-400">
        <span className="mr-2">Less</span>
        <div className={`h-3 w-3 rounded-sm bg-[#161b22]`}></div>
        <div className={`ml-1 h-3 w-3 rounded-sm bg-[#0e4429]`}></div>
        <div className={`ml-1 h-3 w-3 rounded-sm bg-[#006d32]`}></div>
        <div className={`ml-1 h-3 w-3 rounded-sm bg-[#26a641]`}></div>
        <div className={`ml-1 h-3 w-3 rounded-sm bg-[#39d353]`}></div>
        <span className="ml-2">More</span>
      </div>
    </div>
  );
}
