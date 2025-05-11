import { FolderGit2 } from "lucide-react";

interface ProjectCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
}

function ProjectCard({ title, date, location, description }: ProjectCardProps) {
  return (
    <div className="border border-gray-700 rounded-md p-4 bg-[#0d1117]">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <div className="text-gray-400 text-sm mt-1">
        {date} {location}
      </div>
      <p className="mt-3 text-gray-300">{description}</p>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <FolderGit2 className="w-5 h-5 mr-2" />
        <h2 className="text-xl font-medium">Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
