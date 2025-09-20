'use client';

import { useEffect, useState } from 'react';
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
  const [isMockData, setIsMockData] = useState(false);

  // Check if we're using mock data by examining the profile
  useEffect(() => {
    if (profile && profile.login === 'demo-user') {
      setIsMockData(true);
    }
  }, [profile]);

  return (
    <>
      {isMockData && <GitHubTokenWarning />}
      {children}
    </>
  );
}
