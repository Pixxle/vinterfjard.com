---
title: 'Software Development and Product Management Are Converging'
date: '2026-03-09'
tags: ['blog']
---

In my [previous post](/gists/why-i-switched-from-claude-code-to-codex) I mentioned that I read less and less code line by line now. I still review for anti-patterns and obvious garbage, but I don't inspect every single line the way I used to. The speed my team can achieve now is wild to see.

But there are two clear bottlenecks keeping us from going even faster: requirements from product owners, and UAT testing. The second one I'm already working on solving. The first one is more interesting, because I think it points to something bigger happening to our industry.

## The spectrum

Talking with a lot of developers, I've noticed that everyone falls somewhere on a spectrum. On one end, you have developers who enjoy building a product. On the other end, you have developers who enjoy writing code.

Some people take a lot of pride in every single line they write. For them, writing code is like solving a puzzle: how do I express this concept in the most beautiful, efficient way possible? And for others, the code is just the medium. They care about expressing a product concept in the best way possible to a user. The code itself is incidental.

I fall very far towards the product end of the spectrum. Others I talk to fall very far on the craftsmanship end.

As the tools available to us get better and better, I think the people who take enjoyment primarily in the craftsmanship will have a harder and harder time finding satisfaction in this field. Not because they won't be needed, at least not yet, but because the thing they love doing is rapidly becoming something you supervise rather than perform. And I think that's going to be a rough adjustment for a lot of people.

## The developer role has already shifted

The developer role is quickly becoming a technical PM role. Maybe it already has. You spend less time in an editor writing code and more time deciding what should be built and reviewing whether it was built correctly.

From the other direction, product managers are slowly approaching developers. They're picking up tools like Lovable for prototyping, building things that until recently would have required a developer or a UX designer. It's still early, but you can see where it's going. The next step is integration with design tools, and eventually with the autonomous coding tools themselves.

Both sides are moving towards each other. I'm not sure which is moving faster. But the gap is closing.

## What I learned from building a planning tool

I've been working on a tool that picks up tickets from our backlog, plans the implementation, and delegates the actual coding to AI agents. It writes code competently enough. But since introducing it to the team, the part that surprised me most is the planning phase.

Whenever it gets assigned a new task, it starts by reviewing the requirements, looking for edge cases, and asking for feedback. And the questions it asks aren't primarily technical implementation questions. The bigger thing is that it asks product for refinements.

Here's a real example. A ticket came in:

> "The ability to export data is currently unavailable on the detail view."

The tool came back with four questions before writing a single line of code:

1. **Placement**: Where should the export button live? In the tab header area, the top-level action bar, or as a toolbar action inside the data table?
2. **Scope**: Should the export include all history, or respect the currently applied filters and date range?
3. **Language**: Should the export use the current user's locale, or should the user be prompted to choose?
4. **Visibility**: Should the button be gated by a configuration entry, or universally available to users with the right permission?

These are questions a developer would normally have to seek out answers to. They'd read the ticket, realize it was underspecified, and then go track down a product owner to clarify. Now those questions surface before a developer is even aware the ticket exists. The product manager can answer most of them directly, which means by the time a developer picks up the work, the requirements are already much more solid.

The tool doesn't respect the traditional boundary between "product question" and "technical question." It just asks what it needs. And that forces rigor earlier in the process, which is exactly where it should be.

## Where this is heading

If developers spend most of their time reviewing implementations rather than writing them, that's a different job entirely. It's closer to a "responsible engineer" in regulated industries: someone who doesn't build the bridge but stamps the drawings. They carry the accountability for security, correctness, and architectural decisions.

The developers who thrive on product thinking will likely drift into product roles entirely, because that's where their actual interest has always been. The tools just hadn't caught up to let them skip the implementation part.

The developers who love the craft of writing code will still be needed for a while. Someone has to bear the responsibility of verifying that what was built is secure and works as expected. But the day-to-day of the job will look very different from what drew them to it in the first place.

And on the product side, the prototyping tools are only going to get better. Lovable today, Figma integration tomorrow, direct handoff to autonomous coding agents after that. The PM who can describe what they want, prototype it, and have it built without ever filing a ticket to an engineering team is not a far-off scenario.

The two roles are converging. I don't think most people in either role have really internalized what that means for them yet.
