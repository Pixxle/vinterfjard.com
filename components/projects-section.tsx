import { FolderGit2 } from 'lucide-react';
import ProjectCard from '@/components/project-card';

export default function ProjectsSection() {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center">
        <FolderGit2 className="mr-2 h-5 w-5" />
        <h2 className="text-xl font-medium">Projects</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProjectCard
          title="CodeHephaestus"
          description="State machine for refining and automatically building features using Claude Code."
          href="https://github.com/Pixxle/CodeHephaestus"
        />
        <ProjectCard
          title="vinterfjard.com"
          description="A little meta - you are here."
          href="https://github.com/Pixxle/vinterfjard.com"
        />
        <ProjectCard
          title="yuid.me"
          description="Sometimes you just need a quick uuid, curlable without SSL for easy terminal access."
          href="https://github.com/Pixxle/yuid.me"
        />
        <ProjectCard
          title="CodeAtlas"
          description="Technical due diligence for code repositories."
          href="https://github.com/Pixxle/CodeAtlas"
        />
        <ProjectCard
          title="CodeSoteria"
          description="Automated security audits for codebases."
          href="https://github.com/Pixxle/CodeSoteria"
        />
        <ProjectCard
          title="CodeMnemosyne"
          description="Auto-generate a complete MkDocs developer wiki for any codebase."
          href="https://github.com/Pixxle/CodeMnemosyne"
        />
        <ProjectCard
          title="ShadowLog"
          description="Firefox extension for selective browsing history cleanup."
          href="https://github.com/Pixxle/shadowlog"
        />
      </div>
    </div>
  );
}
