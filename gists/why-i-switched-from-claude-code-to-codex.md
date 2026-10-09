---
title: 'Switching from Claude Code to Codex'
date: '2026-02-20'
tags: ['ai', 'blog']
---

> **Update:** I'm back on Claude Code. The stuff I switched to Codex for works in Claude Code now too.

Claude Code is still great. I switched because my day-to-day workflow changed, and Codex fits it better right now.

I've genuinely been very happy with Claude Code for a long time. If you look at how much AI agents have improved over the last six months, it's honestly wild. Once you establish good standards in a project, the first pass from newer models is almost always close to right.

I recently read Peter Steinberg's post, [Shipping at Inference Speed](https://steipete.me/posts/2025/shipping-at-inference-speed), and I agreed with a lot of it. I've also noticed that I read less and less code line by line now. I still review for anti-patterns and obvious garbage, but I don't inspect every single line the way I used to.

That doesn't mean no discipline. I usually work in repos with many contributors, so I don't commit directly to `main`.

I also still believe strongly in review culture, more than ever. Even if I spend less time inspecting every generated line upfront, I still expect solid PRs, real review feedback, and people who are comfortable pushing back when something is unclear, risky, or not ready.

About a year and a half ago I held a talk at work about how I used agents with Copilot. Back then my prompts were long and explicit: what I wanted, which files to touch, how the flow should work, then plan first, then split into phases, then iterate phase by phase. The planning part alone could take hours.

Now my prompts are often closer to: "We need a new endpoint in this repo that does X and requires permissions A and B." That's it. The prompt length has dropped a lot because model quality is better and I trust the first iteration more.

That shift is exactly why Codex started feeling more natural for me. I can run multiple flows at the same time in different worktrees, jump between them, and add new thoughts that get queued and executed when the current flow is done. I can also see real-time code changes in the same view where I'm prompting, which makes the whole feedback loop much tighter.

![Codex app showing real-time code changes, queued thoughts, and inline code comments](/gists/images/codex-comment-workflow.png)

The biggest thing for me is being able to comment directly on generated code. The flow is much closer to how I'd do a PR review, and I rarely even open an editor anymore. Most of my work happens in the Codex app itself.

For how I work today, that fit matters more than any model benchmark.
