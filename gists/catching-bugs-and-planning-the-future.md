---
title: 'The Bug Gemini Caught That Humans Missed for Years'
date: '2025-06-28'
tags: ['ai', 'architecture', 'future']
---

A few months ago I started experimenting with Gemini as a PR reviewer in our main frontend repository. It can't approve PRs on its own, but it can leave comments and suggestions for developers to act on. The early feedback from the team was strong, so after reviewing enough examples myself, I enabled Gemini by default across all pull requests in all repositories.

During our yearly external penetration test, one finding pointed out that our OneTimePassword generator used C# `Random`, which isn't cryptographically secure. The fix looked straightforward: switch to a secure random generator. While reviewing that PR, Gemini flagged a long-standing bug in the surrounding code that human review had missed for ages.

![Gemini AI catching the RandomNumberGenerator bug](/gists/images/gemini-catch.png)

The upper bound on `Next(0, 9)` is exclusive, so the OTP had only ever been built from digits 0-8. A single missing digit had been reducing entropy by 46% in production, and the cryptographic fix was about to ship the same off-by-one if Gemini hadn't caught it.

That's why I think AI reviews are genuinely useful. They catch the kind of thing busy human reviewers tend to miss.

At the same time, we're in the middle of a major architecture redesign around users, organizations, and access rights. Instead of patching around old seams, we decided to use the moment to invest long term and move everything into a monorepo.

For our setup, that gives us shared models across publishers and consumers, better end-to-end traceability, and a much better local developer experience when we need multiple services and dependencies running together. It also gives AI agents full-system context instead of isolated service context, which makes reviews, refactors, and design suggestions much more accurate.

I think architecture decisions should account for AI as a first-class collaborator. Teams that treat AI as an architectural input will move faster and ship more reliably than the ones treating it like an editor plugin.
