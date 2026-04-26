// Note: For server-side env variables like NEXT_PRIVATE_GITHUB_ACCESS_TOKEN,
// access them directly in server components using process.env.NEXT_PRIVATE_GITHUB_ACCESS_TOKEN
// This file only exports client-safe environment variables

export const GITHUB_USERNAME = 'pixxle'; // Replace with your actual GitHub username or make it configurable

// PostHog configuration (client-safe)
export const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';
