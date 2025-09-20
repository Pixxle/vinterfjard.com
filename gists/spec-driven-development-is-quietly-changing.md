---
title: 'Spec Driven Development Is Quietly Changing How We Use AI Editors'
date: '2025-07-18'
tags: ['ai', 'blog']
---

The pace of AI-powered development tools has picked up dramatically. It feels like every month brings a new editor, model, or agent promising to change the way we build software. Some push boundaries. Others stumble. All of them are shaping how developers think about code in this new AI-augmented era.

In this post, we’ll walk through what’s happening across the landscape and take a closer look at Kiro, a new entrant that brings some surprisingly thoughtful ideas to the table.

## VS Code Tries To Catch Up

Microsoft recently rolled out an AI Agents update that finally puts agents directly inside the editor. The catch? Using it feels like waiting in a never-moving security line. You can't selectively approve a batch of commands; instead you must click yes for every single tool invocation it dreams up. After the tenth pop-up your flow is less pair programming and more whack-a-mole approval training.

## Cursor Trips Over Its Own Pricing

Cursor has been the go-to power-user editor for ages, but its latest pricing revamp left many folks with a bad taste. Technically the sticker price stayed the same, but Cursor tightened the rate-limit screws, so users are smashing the ceiling much sooner than before. For anyone locked into a year-long subscription this feels like a bait and switch: you prepaid for horsepower you can no longer reach. A stealth price hike by any other name still empties the wallet.

## Windsurf’s Acquisition Soap Opera

Windsurf keeps swapping dance partners and nobody knows which tune it will settle on. First OpenAI flirted with an acquisition, then Google twirled in for a spin, and now rumors say Devin is lining up the paperwork. Whether any deal sticks is anybody's guess. If you crave the blow by blow, Theo has excellent coverage:

- [Why is OpenAI buying a VS Code fork?](https://www.youtube.com/watch?v=XjK5NIWXysA)
- [The Windsurf situation is pretty wild (RIP 3 billion?)](https://www.youtube.com/watch?v=urEaHW-emY4)
- [Windsurf just got bought...by Devin? This is nuts.](https://www.youtube.com/watch?v=AyLIf7coN_4)

## Claude Code: The Plan Mode Dream

Claude Code remains an excellent AI agent. The Opus model handles every task I throw at it, and its Plan Mode is pure gold: outline the change first, then let the agent handle the heavy lifting. As a Vim user I also appreciate that Claude lives in a separate CLI tool, so I never have to wrestle with plugin gymnastics inside Vim.

## Enter Kiro, The Free-For-Now Newcomer

AWS just tossed its own editor into the ring, and it’s not playing the same game. **Kiro**, a polished fork of VS Code, ships with Anthropic’s models out of the box (yep, the same brains powering Claude Code) yet currently costs the same as air.

Rather than bolt AI features onto traditional workflows, Kiro encourages you to start with intent. If you're the kind of developer who enjoys figuring out what you're building before hammering on the keyboard, this editor might be your soulmate.

There are two ways to work in Kiro: vibe-coding or spec-driven. Vibe-coding is great if you're building vibes. But if you want to plan first, Kiro's spec mode is where the magic happens.

When I used to try this in VS Code, it required a weird dance. I’d draft markdown plans in one tab, open a separate chat window, copy-paste plans between them, and hope nothing went off the rails mid-way.

Spec Mode changes that entirely. Here's what it looks like:

You describe the change. Kiro drafts a requirements document. You review and tweak it together. It creates a design doc. Then it generates a checklist of tasks, which you can walk through, one at a time, with full visibility and control. It's a steady glide from idea to implementation.

Here’s an example from _Nimbus CTL_, my AWS terminal tool:

> "I want to extend the keybind functionality to include another command..."

Kiro responded with a full requirements breakdown. After a few adjustments, it generated a design doc with diagrams and Rust-style struct definitions. Finally, it kicked out a tidy 15-step implementation list.

Best part? If I jump in and say, “actually let’s split that out into a trait,” it updates everything on the fly. No re-prompting or reformatting required.

## Why Spec Driven Development Feels Like The Future

Spec driven development isn’t just a nice philosophy. It’s a productivity multiplier disguised as a workflow preference. When you begin with a well-structured plan, your agent has something real to chew on. Instead of guessing your intent line by line, it has a bird’s-eye view of the full change, the surrounding architecture, and even the user stories.

This upfront clarity means you can let the AI work in parallel, reviewing the spec or design while it drafts the code. Every decision lives in plain text, so it doubles as documentation. And when something breaks later? You already have a paper trail explaining the why.

There’s also a peace-of-mind bonus. When you plan well, the code rarely surprises you. The agent sticks to the map, and you’re free to tweak and refine instead of playing bug whack-a-mole. It’s like programming with a safety net, except the net is made of markdown and good intentions.

The more I work this way, the more chaotic reactive coding feels like shouting into a void. Give me specs, checklists, and a helpful robot that reads them. Every time.

### Want To Dive Deeper?

Read the official launch post here: [https://kiro.dev/blog/introducing-kiro/](https://kiro.dev/blog/introducing-kiro/)

Grab the popcorn, because the AI editor story is just warming up, and Kiro might be writing the next plot twist.
