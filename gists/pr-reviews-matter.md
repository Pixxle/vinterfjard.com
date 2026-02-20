---
title: 'Why PR Reviews matter more than ever in the age of AI-generated code'
date: '2025-12-07'
tags: ['ai', 'culture']
---

There is still debate about whether AI coding assistants truly improve developer productivity. In my experience they do, and by a lot. Work that used to take days can now be generated in minutes. The problem is that this speed introduces a new failure mode: complacency.

I keep seeing developers become less critical of code when they generated it with AI, and even less critical when reviewing AI-generated code from teammates. Bugs, performance issues, and avoidable technical debt pass through because everyone is moving too fast. The answer is not to reject AI. The answer is to raise the bar on pull request reviews.

The most common trap is "does it work" thinking. A developer prompts an agent, gets a lot of code quickly, runs it, sees green output, and moves on. But functional code is not the same thing as production-safe code. I have seen AI produce solutions that returned correct data while introducing multiple full table scans in a single API path. It worked in test conditions and would have hurt real users at scale. A reviewer caught it.

AI also makes very large diffs normal. A 2,000-line PR used to be rare. Now it shows up constantly. Large diffs push everyone toward skimming, and skimming destroys review quality. That is why responsibility sits with the PR author, not the model: break work down, explain intent clearly, and make the change reviewable.

A strong review culture also depends on psychological safety. Reviewers need to be able to say "no" without social fallout. That gets harder with seniority imbalance, where junior reviewers may see problems but still hesitate to block a senior engineer's PR.

My team works on this through recurring ways-of-working conversations, not just static rules. One example was a 1,500-line PR with almost no context. A reviewer said they could not fairly review it asynchronously. The author pushed back and asked why they did not just call for a walkthrough. That became a team discussion, and we aligned on a clear standard: PRs should be self-contained and reviewable without a synchronous meeting.

Another pattern I watch for is "easy reviewer" selection, where people choose reviewers least likely to push back. That weakens quality and blocks knowledge sharing. PRs are not only a gate before merge; they are one of the best systems we have for spreading understanding across the team.

AI-generated code is here to stay and the productivity gains are real. But speed without review quality is just risk delivered faster. The only thing that scales with AI velocity is a review culture where people can challenge code honestly, authors make changes reviewable, and the team keeps recalibrating standards together.
