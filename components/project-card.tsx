import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  href?: string;
}

export default function ProjectCard({ title, description, href }: ProjectCardProps) {
  const content = (
    <div
      className={`h-full rounded-md border border-gray-700 bg-[#0d1117] p-6 ${href ? 'transition-colors hover:border-gray-600' : ''}`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {href && <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-gray-400" />}
      </div>
      <p className="mt-3 text-gray-300">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="h-full">
        {content}
      </Link>
    );
  }

  return content;
}
