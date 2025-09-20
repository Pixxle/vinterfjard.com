'use client';

interface WorkHistoryCardProps {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  status: 'Current' | 'Past';
  description?: string;
  companyColor?: string;
  onClick?: () => void;
}

export default function WorkHistoryCard({
  title,
  company,
  startDate,
  endDate,
  status,
  description,
  companyColor = '#3178c6', // Default blue color similar to TypeScript
  onClick,
}: WorkHistoryCardProps) {
  return (
    <div
      className="cursor-pointer rounded-md border border-gray-700 bg-[#0d1117] p-4 transition-colors hover:bg-[#161b22]"
      onClick={onClick}
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-medium text-blue-400 hover:underline">
          <a href="#" onClick={e => e.preventDefault()}>
            {title}
          </a>
        </h3>
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            status === 'Current' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
          }`}
        >
          {status}
        </span>
      </div>

      {description && <div className="mt-2 mb-4 text-sm text-gray-300">{description}</div>}

      <div className="mt-3 flex items-end justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: companyColor }}></span>
          <span className="text-gray-300">{company}</span>
        </div>

        <div className="text-xs text-gray-400">
          {startDate} - {endDate}
        </div>
      </div>
    </div>
  );
}
