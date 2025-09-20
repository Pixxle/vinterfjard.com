import { Calendar } from 'lucide-react';
import ContributionGraph from '@/components/contribution-graph';
import ActivityTimeline from '@/components/activity-timeline';
import EducationSection from '@/components/education-section';
import ProjectsSection from '@/components/projects-section';
import LanguagesCertificationsAwards from '@/components/languages-certifications-awards';
import ReadmeSection from '@/components/readme-section';
import WorkExperienceSection from '@/components/work-experience-section';
import SharedLayout from '@/components/shared-layout';
import { getUserContributions, getUserActivity } from '@/lib/github';
import { GITHUB_USERNAME } from '@/lib/env';

// Contributions section component
interface ContributionsData {
  totalContributions: number;
  weeks: Array<{
    contributionDays: Array<{
      date: string;
      contributionCount: number;
      contributionLevel: string;
    }>;
  }>;
}

function ContributionsSection({ contributions }: { contributions: ContributionsData }) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-medium">
          {contributions.totalContributions} contributions in the last year
        </h3>
        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="mr-1 h-4 w-4" />
          <span>
            {(() => {
              const now = new Date();
              const lastYear = new Date();
              lastYear.setFullYear(now.getFullYear() - 1);

              const formatDate = (date: Date) => {
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                });
              };

              return `${formatDate(lastYear)} - ${formatDate(now)}`;
            })()}
          </span>
        </div>
      </div>
      <ContributionGraph contributions={contributions} />
    </div>
  );
}

// Activity section component
async function ActivitySection() {
  let activityData = null;

  try {
    activityData = await getUserActivity(GITHUB_USERNAME);
  } catch (error) {
    console.error('Error fetching GitHub activity data:', error);
  }

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-base font-medium">Contribution activity</h3>
      {activityData ? (
        <ActivityTimeline activityData={activityData} />
      ) : (
        <div className="rounded-md border border-gray-700 bg-[#0d1117] p-4 py-12 text-center text-gray-400">
          Loading activity data...
        </div>
      )}
    </div>
  );
}

// Default fallback contributions
const defaultContributions: ContributionsData = {
  totalContributions: 0,
  weeks: [],
};

// Main page component
export default async function Home() {
  // Fetch GitHub data for contributions
  let contributions;

  try {
    contributions = await getUserContributions(GITHUB_USERNAME);
  } catch (error) {
    console.error('Error fetching GitHub contributions data:', error);
  }

  // Create a safe version of contributions data if none is available
  const safeContributions = contributions || defaultContributions;

  return (
    <SharedLayout>
      <div id="overview">
        <ReadmeSection />
      </div>
      <div id="experience">
        <WorkExperienceSection />
      </div>
      <EducationSection />
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="skills">
        <LanguagesCertificationsAwards />
      </div>
      <div id="contributions">
        <ContributionsSection contributions={safeContributions} />
      </div>
      <ActivitySection />
    </SharedLayout>
  );
}
