---
title: "Request Trust Boundaries"
description: "Notes for identifying where a web request crosses identities, parsers, services, and authorization decisions."
category: web-application-security
pubDate: 2026-07-25
topics:
  - HTTP
  - authorization
  - input handling
---

A request is not a single trusted object. It is reinterpreted by browsers, proxies, gateways, frameworks, application code, databases, and downstream services. Each interpretation can create a new trust boundary.

## Start with the request path

For a security review, map the full path rather than starting at the controller:

1. The browser constructs and sends the request.
2. An edge service terminates TLS and may normalize headers or paths.
3. A gateway authenticates the caller and forwards identity context.
4. The framework parses the route, query, body, and cookies.
5. Application code performs authorization and business validation.
6. Downstream systems interpret values again.

The same input can have different meanings at different layers. A path normalized by a proxy may not match the path evaluated by the application. A header added by a trusted gateway may become attacker-controlled if the service is also reachable directly.

## Separate authentication from authorization

Authentication establishes an identity. Authorization decides whether that identity can perform a specific action on a specific resource. A valid session does not make every object identifier, tenant identifier, or workflow transition trustworthy.

I look for three questions at each sensitive operation:

- Who is the effective principal?
- Which resource and tenant are being acted on?
- Where is the relationship between the principal and resource enforced?

## Treat parser transitions as boundaries

Values often cross multiple grammars: URL encoding, JSON, templates, SQL, shell commands, or another HTTP request. Validation at the first parser does not guarantee safety at the next parser.

Use typed values and structured APIs where possible. When a string must cross into another grammar, apply the control required by the destination context at the final point of use.

## Review checklist

- Can clients reach the service without the expected gateway?
- Are forwarding headers removed and recreated at the trust boundary?
- Is authorization enforced on every object lookup and state change?
- Do alternate content types invoke different parsers?
- Can path, host, or method normalization differ across layers?
- Are downstream requests constrained to expected destinations?
