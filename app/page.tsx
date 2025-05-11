import { Calendar } from "lucide-react";
import ContributionGraph from "@/components/contribution-graph";
import ActivityTimeline from "@/components/activity-timeline";
import ProfileSidebar from "@/components/profile-sidebar";
import EducationSection from "@/components/education-section";
import ProjectsSection from "@/components/projects-section";
import LanguagesCertificationsAwards from "@/components/languages-certifications-awards";
import ReadmeSection from "@/components/readme-section";
import WorkExperienceSection from "@/components/work-experience-section";
import MockDataDetector from "@/components/mock-data-detector";
import {
  getUserProfile,
  getUserContributions,
  getUserActivity,
} from "@/lib/github";
import { GITHUB_USERNAME } from "@/lib/env";

// Navigation tab component
function NavigationTabs({ contributions }: { contributions: number | string }) {
  return (
    <div className="border-b border-gray-700 mb-6">
      <nav className="flex overflow-x-auto">
        <a
          href="#overview"
          className="px-4 py-2 border-b-2 border-[#f78166] font-medium"
        >
          Overview
        </a>
        <a
          href="#experience"
          className="px-4 py-2 text-gray-400 hover:text-gray-200"
        >
          Experience{" "}
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-700">
            7
          </span>
        </a>
        <a
          href="#contributions"
          className="px-4 py-2 text-gray-400 hover:text-gray-200"
        >
          Contributions{" "}
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-700">
            {contributions}
          </span>
        </a>
        <a
          href="#projects"
          className="px-4 py-2 text-gray-400 hover:text-gray-200"
        >
          Projects{" "}
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-700">
            2
          </span>
        </a>
      </nav>
    </div>
  );
}

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

function ContributionsSection({
  contributions,
}: {
  contributions: ContributionsData;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-medium">
          {contributions.totalContributions} contributions in the last year
        </h3>
        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="w-4 h-4 mr-1" />
          <span>
            {(() => {
              const now = new Date();
              const lastYear = new Date();
              lastYear.setFullYear(now.getFullYear() - 1);

              const formatDate = (date: Date) => {
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
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
    console.error("Error fetching GitHub activity data:", error);
  }

  return (
    <div className="mb-8">
      <h3 className="text-base font-medium mb-4">Contribution activity</h3>
      {activityData ? (
        <ActivityTimeline activityData={activityData} />
      ) : (
        <div className="rounded-md border border-gray-700 bg-[#0d1117] p-4 text-center text-gray-400 py-12">
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
  // Fetch GitHub data
  let profile;
  let contributions;

  try {
    // Fetch user profile and contributions in parallel
    [profile, contributions] = await Promise.all([
      getUserProfile(GITHUB_USERNAME),
      getUserContributions(GITHUB_USERNAME),
    ]);
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    // Continue with default data if there's an error
  }

  const totalContributions =
    contributions &&
    typeof contributions === "object" &&
    "totalContributions" in contributions
      ? contributions.totalContributions
      : "?";

  // Create a safe default profile if none is available
  const safeProfile = profile || { login: "default-user", name: "GitHub User" };

  // Create a safe version of contributions data if none is available
  const safeContributions = contributions || defaultContributions;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <MockDataDetector profile={safeProfile}>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left sidebar with profile info */}
            <ProfileSidebar profile={profile} />

            {/* Main content */}
            <div className="flex-1">
              <NavigationTabs contributions={totalContributions} />
              <div id="overview">
                <ReadmeSection />
              </div>
              <div id="experience">
                <WorkExperienceSection />
              </div>
              <div id="contributions">
                <ContributionsSection contributions={safeContributions} />
              </div>
              <ActivitySection />
              <EducationSection />
              <div id="projects">
                <ProjectsSection />
              </div>
              <div id="skills">
                <LanguagesCertificationsAwards />
              </div>
            </div>
          </div>
        </MockDataDetector>
      </div>
    </div>
  );
}
