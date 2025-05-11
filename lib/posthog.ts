"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React from "react";

// Load environment variables
const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

// Initialize PostHog only on the client side and only if API key is available
if (typeof window !== "undefined" && posthogApiKey) {
  posthog.init(posthogApiKey, {
    api_host: posthogHost,
    capture_pageview: false, // We'll manually capture pageviews
    loaded: () => {
      if (process.env.NODE_ENV === "development") {
        // Log events in development
        console.log("[PostHog] Initialized");
      }
    },
    // Add any other configuration options here
    session_recording: {
      maskAllInputs: true,
      maskInputOptions: {
        password: true,
      },
    },
  });
}

// Component to wrap your app with PostHog provider
export function PostHogProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return React.createElement(PostHogProvider, { client: posthog }, children);
}

// Export PostHog instance for direct access
export { posthog };
