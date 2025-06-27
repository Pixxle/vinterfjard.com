# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development server
npm run dev

# Build the application
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint
```

## Architecture Overview

This is a Next.js 15 application built with TypeScript, Tailwind CSS, and shadcn/ui components. It serves as a GitHub-inspired developer portfolio website.

### Key Architecture Components

- **App Router**: Uses Next.js 15 App Router (`app/` directory)
- **Server Components**: Most components are server-side rendered, including data fetching
- **GitHub Integration**: Fetches real GitHub data via GraphQL API with graceful fallback to mock data
- **Component Library**: Built on shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Analytics**: PostHog integration for user analytics

### Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components (both custom and UI components)
  - `ui/` - shadcn/ui components (auto-generated, avoid direct edits)
- `lib/` - Utility functions and API integrations
  - `github.ts` - GitHub GraphQL API integration with mock data fallbacks
  - `env.ts` - Environment variable configuration
- `hooks/` - Custom React hooks
- `public/` - Static assets including logos and badges

### Data Fetching Strategy

The application uses a hybrid approach for GitHub data:
- **With Token**: Fetches live data from GitHub GraphQL API
- **Without Token**: Falls back to mock data defined in `lib/mock-github-data.ts`
- **Error Handling**: Graceful degradation when API calls fail

### Component Patterns

- Server components for data fetching (e.g., `getUserProfile`, `getUserActivity`)
- Client components only when necessary for interactivity
- Consistent use of Tailwind for styling
- TypeScript interfaces for all data structures

### Environment Configuration

- `GITHUB_ACCESS_TOKEN` - Server-side GitHub API token (optional)
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics key (optional)
- `GITHUB_USERNAME` - Hardcoded in `lib/env.ts` as "pixxle"

### Theme System

- Uses `next-themes` for dark/light mode switching
- Default theme is dark mode
- CSS variables defined in `app/globals.css` for consistent theming
- shadcn/ui color system with HSL color space

## Development Notes

- TypeScript and ESLint errors are ignored during builds (configured in `next.config.mjs`)
- Images are unoptimized for deployment flexibility
- Uses React 19 with Next.js 15
- Server actions are used for GitHub API calls (`"use server"` directive)