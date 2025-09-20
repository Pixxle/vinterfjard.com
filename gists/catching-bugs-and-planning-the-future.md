---
title: 'Catching Bugs and Planning the Future: AI Tooling in Practice'
date: '2025-06-28'
tags: ['ai', 'architecture', 'future']
---

A couple of months ago, I started experimenting with using Gemini as a pull request reviewer in our primary frontend repository. It cannot approve pull requests on its own, but it provides suggestions and considerations for developers to act on.

The initial feedback from the team was overwhelmingly positive. Our frontend developers found the comments helpful and relevant, and after reviewing some of them myself, I decided to take the next step: enabling Gemini by default across all pull requests in all repositories.

## Where the Magic Happened

This is when things got interesting.

As part of our yearly security obligations, we undergo external penetration testing. One of the findings this year pointed out that our OneTimePassword generator used the default `Random` class in C#, which is not cryptographically secure. The fix was simple, switch to a secure random generator.

But then Gemini caught something that every developer could easily miss.

![Gemini AI catching the RandomNumberGenerator bug](/gists/images/gemini-catch.png)

A simple mistake, but a serious one. By excluding the digit 9, the OTP entropy was reduced by 46%. That is not a small issue. That is a real-world, security-impacting bug, and Gemini caught it before production.

## Reflecting on AI and the Future

That experience made me think more seriously about how AI tooling can shape both the quality and security of our code.

Right now, we are going through a major architectural redesign. We're changing how we model users, organizations, and access rights. These updates impact every service we maintain, some lightly and others significantly.

Rather than just patching things, we decided to use this opportunity to invest in the long-term. We're moving all of our code into a mono-repository.

## Why a Monorepo Makes Sense Now

Consolidating our code into a single repository offers multiple benefits:

- **Shared models**: A service that publishes a message and a service that consumes it can rely on the exact same model. No more mismatched contracts.
- **End-to-end traceability**: With shared telemetry and event structures, we can follow a request across services and see exactly what happens, from API call to database write.
- **Improved developer experience**: It's rare that we work on a single isolated service. More often than not, we need to coordinate changes across multiple services. Running those locally in tandem can be painful. With a mono-repo, we can create a robust `docker-compose` setup where any developer can spin up the full system locally. Services, dependencies, databases, everything, and get a fully functioning environment within minutes.
- **AI agent visibility**: With a monorepo, our agents can reason about the entire system in one go, rather than operating in silos. This opens up entirely new possibilities: holistic code reviews, better understanding of service interactions, and more accurate automated refactoring suggestions. Instead of acting like a plugin for a single service, AI agents can start acting like true system architects. The more context they have, the smarter and more helpful they become.

## Looking Ahead

Security, performance, developer experience, all of it matters. And as AI continues to evolve at a breakneck pace, it is becoming clearer that the best way to stay ahead is not just to adopt these tools, but to shape your architecture around them.

We're building systems that are not only easier for humans to work with, but also for AI to understand, reason about, and improve.

This isn’t just an upgrade. It’s the beginning of a very different way of writing and maintaining software.

And I couldn’t be more excited about it.
