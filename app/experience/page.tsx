import { Presentation } from 'lucide-react';
import SharedLayout from '@/components/shared-layout';
import WorkExperienceSection from '@/components/work-experience-section';
import EducationSection from '@/components/education-section';
import LanguagesCertificationsAwards from '@/components/languages-certifications-awards';
import ProjectCard from '@/components/project-card';

export default function ExperiencePage() {
  return (
    <SharedLayout>
      <WorkExperienceSection />
      <div className="mb-8">
        <div className="mb-4 flex items-center">
          <Presentation className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-medium">Workshops</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProjectCard
            title="Making life less boring with Python"
            description="The second edition to my Python automation workshop for members of SDCN as well as external parties. April 2019, Stockholm."
          />
          <ProjectCard
            title="Making life less boring with Python - Python workshop"
            description="I held a two-day introductory workshop in automation techniques with Python for Stockholm dual career network. December 2018, Stockholm."
          />
        </div>
      </div>
      <EducationSection />
      <LanguagesCertificationsAwards />
    </SharedLayout>
  );
}
