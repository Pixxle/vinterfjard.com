---
title: 'Spec Driven Development Is Quietly Changing How We Use AI Editors'
date: '2025-07-18'
tags: ['ai', 'blog']
---

The AI editor space has been moving so fast that it is hard to keep up. Every few weeks there is a new editor, model, or pricing change that forces you to reevaluate your workflow. Some tools push the quality bar up, some tools create new friction, and all of them are changing how we build software.

My own workflow has gone through that same cycle. VS Code improved by adding agents directly in the editor, but using it often felt like death by approval dialog. Cursor used to feel like the power-user default, but the latest pricing and rate-limit behavior made it harder to trust for sustained heavy use. Windsurf turned into an ongoing acquisition saga where the future felt unclear, and if you want that timeline, Theo covered it well in [this video](https://www.youtube.com/watch?v=XjK5NIWXysA), [this one](https://www.youtube.com/watch?v=urEaHW-emY4), and [this one](https://www.youtube.com/watch?v=AyLIf7coN_4).

Claude Code stayed strong through all of this. Plan Mode is still one of the best workflows I have used because it forces a clean outline before implementation, and as a Vim user I like having the agent in a separate CLI instead of bolted into my editor setup.

Then I started using Kiro. At the time, it was free, shipped with Anthropic models, and pushed a workflow that felt much closer to how I actually want to work: start from intent, lock requirements, shape design, then execute with traceable tasks. Before that, I was doing a manual dance with markdown docs and chat tabs, copying context around and hoping I did not lose state. Kiro made that flow more native.

What sold me was not just document generation, it was continuity. I could describe a change, get requirements, refine them, get design output, and walk through a task list while still being able to redirect the architecture in the middle without restarting from zero. That was a major workflow upgrade.

The deeper point is that spec driven development is not just a process preference anymore. It is a multiplier for agent quality. Good specs give agents real context, reduce guesswork, and make implementation more predictable. The side effect is better documentation, better async collaboration, and less chaos when you revisit the change later.

The more I work this way, the less appealing ad hoc reactive coding feels. I still want speed, but I want speed with structure. For me, specs are the structure that finally makes AI-assisted development scale.
