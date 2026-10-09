import ProfileSidebar from '@/components/profile-sidebar';
import MockDataDetector from '@/components/mock-data-detector';
import { getUserProfile } from '@/lib/github';
import { GITHUB_USERNAME } from '@/lib/env';

interface SharedLayoutProps {
  children: React.ReactNode;
}

export default async function SharedLayout({ children }: SharedLayoutProps) {
  let profile;

  try {
    profile = await getUserProfile(GITHUB_USERNAME);
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    // Continue with default data if there's an error
  }

  // Create a safe default profile if none is available
  const safeProfile = profile || { login: 'default-user', name: 'GitHub User' };

  return (
    <MockDataDetector profile={safeProfile}>
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left sidebar with profile info */}
        <ProfileSidebar profile={profile} />

        {/* Main content */}
        <div className="flex-1">{children}</div>
      </div>
    </MockDataDetector>
  );
}
