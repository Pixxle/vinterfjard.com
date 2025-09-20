'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { posthog } from '@/lib/posthog';

export function usePostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageviews
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`;
      }

      // Track pageview
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);
}

export function usePostHogIdentify(distinctId?: string, properties?: Record<string, any>) {
  useEffect(() => {
    // Only identify if we have a distinctId
    if (distinctId) {
      posthog.identify(distinctId, properties);
    }
  }, [distinctId, properties]);
}

// Utility function to track custom events
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  posthog.capture(eventName, properties);
}
