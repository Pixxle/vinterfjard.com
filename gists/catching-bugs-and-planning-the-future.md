---
title: 'Catching Bugs and Planning the Future: AI Tooling in Practice'
date: '2025-06-28'
tags: ['ai', 'architecture', 'future']
---

A few months ago I started experimenting with Gemini as a PR reviewer in our main frontend repository. It cannot approve PRs on its own, but it can leave comments and suggestions for developers to act on. The early feedback from the team was strong, so after reviewing enough examples myself, I enabled Gemini by default across all pull requests in all repositories.

That is where things got interesting.

During our yearly external penetration test, one finding pointed out that our OneTimePassword generator used C# `Random`, which is not cryptographically secure. The fix looked straightforward: switch to a secure random generator. But Gemini then caught a subtle follow-up issue that could have easily slipped through human review.

![Gemini AI catching the RandomNumberGenerator bug](/gists/images/gemini-catch.png)

A single excluded digit had reduced OTP entropy by 46%. It was an easy mistake to make and a serious security issue if it had reached production.

That moment changed how I think about AI tooling. It is not just about speed. It is also about expanding the review surface and catching classes of issues that busy teams regularly miss.

At the same time, we are in the middle of a major architecture redesign around users, organizations, and access rights. Instead of patching around old seams, we decided to use the moment to invest long term and move everything into a monorepo.

For our setup, that gives us shared models across publishers and consumers, better end-to-end traceability, and a much better local developer experience when we need multiple services and dependencies running together. It also gives AI agents full-system context instead of isolated service context, which makes reviews, refactors, and design suggestions much more accurate.

The direction feels clear to me now: architecture decisions should account for AI as a first-class collaborator. The teams that treat AI as an architectural input, not just an editor plugin, will move faster and ship more reliably.
