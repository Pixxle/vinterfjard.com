---
title: 'Don''t Let AI Make You Lazy'
date: '2025-12-07'
tags: ['ai', 'culture']
---

There's still debate about whether AI coding assistants truly improve developer productivity. In my experience they do. Work that used to take days can now be generated in minutes. Complacency in code review has always been a failure mode. This kind of speed just makes it much more prominent.

I keep seeing developers become less critical of code when they generated it with AI, and even less critical when reviewing AI-generated code from teammates. Bugs, performance issues, and avoidable technical debt pass through because everyone's moving too fast. Rejecting AI won't fix that. Raising the bar on pull request reviews will.

The most common trap is "does it work" thinking. A developer prompts an agent, gets a lot of code quickly, runs it, sees green output, and moves on. But functional code isn't the same thing as production-safe code. I've seen AI produce solutions that returned correct data while introducing multiple full table scans in a single API path. It worked in test conditions and would have hurt real users at scale. A reviewer caught it.

AI also makes very large diffs normal. A 2,000-line PR used to be rare. Now it shows up constantly. Large diffs push everyone toward skimming, and skimming destroys review quality. That's why responsibility sits with the PR author rather than the model: break work down, explain intent clearly, and make the change reviewable.

A strong review culture also depends on psychological safety. Reviewers need to be able to say "no" without social fallout. That gets harder with seniority imbalance, where junior reviewers may see problems but still hesitate to block a senior engineer's PR.

My team works on this through recurring ways-of-working conversations rather than static rules. One example was a 1,500-line PR with almost no context. A reviewer said they couldn't fairly review it asynchronously. The author pushed back and asked why they didn't just call for a walkthrough. That became a team discussion, and we aligned on a clear standard: PRs should be self-contained and reviewable without a synchronous meeting.

Another pattern I watch for is "easy reviewer" selection, where people choose reviewers least likely to push back. That weakens code quality and wastes one of the best chances a team has to build shared understanding.

AI-generated code is here to stay and the productivity gains are real. But PR review culture matters more than ever.
