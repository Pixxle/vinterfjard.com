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

## MCP Server Integration

This project is configured to work with MCP (Model Context Protocol) servers, particularly Serena for advanced code analysis and editing capabilities.

### **IMPORTANT: Always Use Serena for Code Work**

**When working with code, ALWAYS prioritize Serena MCP tools over standard file tools.** Serena provides superior code understanding, symbol-based editing, and project analysis capabilities that are essential for professional development work.

**Serena-First Approach:**

- Use `mcp__serena__get_symbols_overview` instead of basic file reading to understand code structure
- Use `mcp__serena__find_symbol` instead of text search when looking for classes, methods, or functions
- Use `mcp__serena__replace_symbol_body` instead of text-based edits for method/function modifications
- Use `mcp__serena__insert_after_symbol` / `mcp__serena__insert_before_symbol` for precise code placement
- Use `mcp__serena__search_for_pattern` for advanced pattern matching across the codebase

**Why Serena is Superior for Code Editing:**

- **Language-aware**: Understands code structure, not just text
- **Precise targeting**: Edit specific symbols (classes, methods) without affecting surrounding code
- **Automatic formatting**: Handles indentation and code structure automatically
- **Safer refactoring**: Symbol-based edits reduce risk of breaking code
- **Better analysis**: Provides symbol relationships and referencing information

### Available MCP Tools

#### Serena MCP Server (`mcp__serena__*`)

**Essential for all code work** - provides advanced code analysis, symbol-based editing, and project management:

**File Operations:**

- `mcp__serena__read_file` - Read files or file chunks with line-based access
- `mcp__serena__create_text_file` - Create new files (prefer editing existing files)
- `mcp__serena__list_dir` - List directory contents recursively
- `mcp__serena__find_file` - Find files by name pattern using wildcards

**Symbol-Based Code Analysis (Use These First):**

- `mcp__serena__get_symbols_overview` - Get high-level overview of code symbols in files/directories
- `mcp__serena__find_symbol` - Find symbols by name path (classes, methods, functions, etc.)
- `mcp__serena__find_referencing_symbols` - Find symbols that reference a given symbol (including subclasses)

**Advanced Code Editing (Preferred for All Code Changes):**

- `mcp__serena__replace_symbol_body` - Replace the body of a symbol (method, class, function)
- `mcp__serena__insert_after_symbol` - Insert code after a symbol definition
- `mcp__serena__insert_before_symbol` - Insert code before a symbol definition
- `mcp__serena__replace_regex` - Replace text using regular expressions with wildcards
- `mcp__serena__replace_lines` - Replace specific line ranges
- `mcp__serena__insert_at_line` - Insert content at specific line numbers
- `mcp__serena__delete_lines` - Delete line ranges

**Search and Pattern Matching:**

- `mcp__serena__search_for_pattern` - Search for regex patterns across files with context
- `mcp__serena__execute_shell_command` - Execute shell commands with output capture

**Project Management:**

- `mcp__serena__activate_project` - Activate specific projects
- `mcp__serena__switch_modes` - Switch between different working modes
- `mcp__serena__get_current_config` - View current configuration
- `mcp__serena__initial_instructions` - Get project-specific initial instructions

**Memory and Context Management:**

- `mcp__serena__write_memory` - Store project information for future reference
- `mcp__serena__read_memory` - Read stored project memories
- `mcp__serena__list_memories` - List available memory files
- `mcp__serena__delete_memory` - Remove memory files

**Analysis and Planning:**

- `mcp__serena__think_about_collected_information` - Analyze gathered information
- `mcp__serena__think_about_task_adherence` - Check if on track with current task
- `mcp__serena__think_about_whether_you_are_done` - Evaluate task completion
- `mcp__serena__summarize_changes` - Summarize codebase modifications

**Workflow Management:**

- `mcp__serena__check_onboarding_performed` - Check if project onboarding is complete
- `mcp__serena__onboarding` - Perform project onboarding
- `mcp__serena__restart_language_server` - Restart language server if needed
- `mcp__serena__prepare_for_new_conversation` - Prepare for new conversation context

#### Context7 MCP Server (`mcp__context7__*`)

Provides documentation access for libraries and frameworks:

- `mcp__context7__resolve-library-id` - Resolve package names to Context7 library IDs
- `mcp__context7__get-library-docs` - Fetch up-to-date documentation for libraries

#### Sequential Thinking MCP Server

- `mcp__sequential-thinking__sequentialthinking` - Advanced problem-solving through structured thinking

### MCP Workflow Guidelines

**Standard Code Analysis Workflow:**

1. Start with `mcp__serena__get_symbols_overview` to understand project structure
2. Use `mcp__serena__find_symbol` to locate specific code elements
3. Use `mcp__serena__find_referencing_symbols` to understand dependencies and impact
4. Apply symbol-based edits using `mcp__serena__replace_symbol_body` or insert operations
5. Use `mcp__serena__think_about_whether_you_are_done` to verify completion

**Memory Usage:**

- Always use `mcp__serena__write_memory` to store important insights about the project
- Use `mcp__serena__read_memory` to recall previous analysis and decisions
- Build up project knowledge over time through consistent memory usage

## Development Notes

- TypeScript and ESLint errors are ignored during builds (configured in `next.config.mjs`)
- Images are unoptimized for deployment flexibility
- Uses React 19 with Next.js 15
- Server actions are used for GitHub API calls (`"use server"` directive)
