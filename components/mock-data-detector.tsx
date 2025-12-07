import { GitHubTokenWarning } from '@/components/github-token-warning';

export default function MockDataDetector({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: {
    login: string;
    [key: string]: unknown;
  };
}) {
  const isMockData = profile?.login === 'demo-user';

  return (
    <>
      {isMockData && <GitHubTokenWarning />}
      {children}
    </>
  );
}
