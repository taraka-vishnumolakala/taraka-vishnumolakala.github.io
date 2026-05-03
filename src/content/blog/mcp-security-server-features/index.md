---
title: "Threat-Modeling MCP's Server Features"
description: "Part 1 of the MCP Security series — a feature-by-feature threat model of Tools, Resources, Prompts, and the server-side utilities the 2025-11-25 spec expanded."
pubDate: 2026-05-03
tags:
  - mcp
  - security
  - threat-modeling
  - mcp-security-series
---

<!-- TODO: lede paragraph — frame what Part 1 covers, who it's for, and what the reader walks away with. -->

> **MCP Security series** — Part 1 of 4
>
> 1. **Server features** *(currently reading)*
> 2. Client capabilities — *coming soon*
> 3. Protocol & transport — *coming soon*
> 4. Operating MCP securely — *coming soon*

## What this is / who it's for

<!-- 2–3 sentences: the cluster, prerequisites, place in the series. -->

## Architecture, primitives, and the trust-boundary map

<!-- ~400 words. Diagrams: architecture.png, primitives-overview.png, trust-boundaries.png. -->

## Why the LLM reads descriptions and data as instructions

<!-- ~250 words. The single most important fact in MCP security. -->

## The threat-modeling lens

<!-- Introduce the six-step lens (Definition → Mechanics → Trust boundary → Abuser stories → Detection signals → Mitigations). One paragraph per step + why this lens vs STRIDE/OWASP. -->

## Tools: the lens, walked through

<!-- ~900 words. Full six-step on Tools — poisoning, rug pull, shadow tools, covert invocation, cross-server orchestration injection. Diagrams: tool-poisoning-flow.png, rug-pull-timeline.png, cross-server-injection-flow.png. -->

## Resources

<!-- ~700 words. Six-step lens. Poisoning, indirect prompt injection, path-templated resources, subscription mechanics (resources/subscribe → notifications/resources/updated), annotations as a hidden steering channel (audience/priority). Diagram: resource-poisoning-flow.png. -->

## Prompts

<!-- ~400 words. Six-step lens. Template injection, slash-command hijacking, hidden tool chains. Diagram: prompt-template-injection-flow.png. -->

## Tool output schema and the dual error model

<!-- ~400 words. Six-step lens. outputSchema validation, structuredContent, -32602/-32603 (protocol) vs isError: true (tool execution / LLM self-correction). Abuser angle: poisoned outputSchema misclassifying sensitive data; forged isError steering self-correction. -->

## Completion: argument autocomplete and the quietest data-leak channel

<!-- ~400 words. Six-step lens. completion/complete, ref/prompt and ref/resource, stateful context.arguments. Abuser angle: completion endpoints leak enumerable identifiers without surfacing in tool-call audit logs. Optional diagram: completion-attack-flow.png. -->

## Logging as a server-side primitive

<!-- ~350 words. Six-step lens. logging/setLevel, notifications/message, RFC 5424 levels. Spec mandate: log messages MUST NOT contain credentials, secrets, PII, or internal system details. Abuser angle: misconfigured/compromised server emits secrets via notifications/message; client trusts the server's own redaction. -->

## Pagination as an attack surface

<!-- ~250 words. Six-step lens. Opaque cursors, cross-tenant cursor leakage. Abuser: cursor issued for tenant A replayed against tenant B's session. -->

## Cross-feature attack patterns within server features

<!-- ~300 words. Combinations: cross-server orchestration injection (multi-feature framing), annotation-driven steering combined with subscription-pushed updates, completion + logging exfiltration chains. -->

## Mitigations summary for server features

<!-- ~250 words. Compact reference table or bulleted summary. -->

## Builder checklist

<!-- Short, actionable. Not the omnibus checklist (Post 4). -->

## What's next

<!-- Cross-link to Post 2 (client capabilities), brief teaser. Restate series-nav block. -->

> **MCP Security series** — Part 1 of 4
>
> 1. **Server features** *(currently reading)*
> 2. Client capabilities — *coming soon*
> 3. Protocol & transport — *coming soon*
> 4. Operating MCP securely — *coming soon*
