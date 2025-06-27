import ProfileSidebar from "@/components/profile-sidebar";
import NavigationTabs from "@/components/navigation-tabs";
import MockDataDetector from "@/components/mock-data-detector";
import {
  getUserProfile,
  getUserContributions,
} from "@/lib/github";
import { GITHUB_USERNAME } from "@/lib/env";

interface SharedLayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export default async function SharedLayout({ 
  children, 
  showNavigation = true 
}: SharedLayoutProps) {
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

  return (
    <MockDataDetector profile={safeProfile}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar with profile info */}
        <ProfileSidebar profile={profile} />

        {/* Main content */}
        <div className="flex-1">
          {showNavigation && (
            <NavigationTabs contributions={totalContributions} />
          )}
          {children}
        </div>
      </div>
    </MockDataDetector>
  );
}