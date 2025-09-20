'use client';

import { Suspense } from 'react';
import { usePostHogPageView } from '@/hooks/use-posthog';

// Separate component that uses the hook
function AnalyticsInner() {
  // This will automatically track page views
  usePostHogPageView();
  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
