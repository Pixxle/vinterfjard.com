import { FolderGit2 } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
}

function ProjectCard({ title, date, location, description }: ProjectCardProps) {
  return (
    <div className="rounded-md border border-gray-700 bg-[#0d1117] p-4">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <div className="mt-1 text-sm text-gray-400">
        {date} {location}
      </div>
      <p className="mt-3 text-gray-300">{description}</p>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center">
        <FolderGit2 className="mr-2 h-5 w-5" />
        <h2 className="text-xl font-medium">Projects</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProjectCard
          title="Making life less boring with Python"
          date="04/2019 - 04/2019"
          location="Stockholm, Sweden"
          description="The second edition to my Python automation workshop for members of SDCN as well as external parties."
        />

        <ProjectCard
          title="Making life less boring with Python - Python workshop"
          date="12/2018 - 12/2018"
          location="Stockholm, Sweden"
          description="I held a two-day introductory workshop in automation techniques with Python for Stockholm dual career network."
        />
      </div>
    </div>
  );
}
