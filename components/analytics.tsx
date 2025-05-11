"use client";

import { usePostHogPageView } from "@/hooks/use-posthog";

export function Analytics() {
  // This will automatically track page views
  usePostHogPageView();

  return null; // This component doesn't render anything
}
