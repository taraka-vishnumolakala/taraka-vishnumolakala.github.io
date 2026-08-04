# Source review notes

Research completed: **August 1, 2026**

## Scope and method

Both primary PDFs were downloaded, text-extracted page by page, and read completely. Every page was also rendered and included in a visual montage to catch diagrams, tables, captions, and layout-dependent material that text extraction could miss.

- [Anthropic / Claude, *Zero Trust for AI Agents*](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a1611a04085d7cd3dadc924_Claude-eBook-Zero-Trust-for-AI-Agents-05182026.pdf): 36 PDF pages reviewed.
- [OWASP, *Agentic AI: Threats and Mitigations, Version 1.1*](https://genai.owasp.org/download/45674/?tmstv=1739819891): 53 PDF pages reviewed.

All page citations in the presentation use the actual PDF page number, starting with the cover as page 1. OWASP's printed footer numbers are generally one lower because its cover is unnumbered; the deck intentionally uses PDF page numbers so citations resolve consistently in a viewer.

External hyperlinks were extracted from annotations and visible URLs in the Anthropic PDF, normalized, deduplicated, and reviewed one hop deep. Redirect destinations were reviewed. No link on a destination page was followed. No external destination embedded in the OWASP PDF was opened.

## Anthropic / Claude page map

| PDF pages | Material used in the deck |
|---|---|
| 1–2 | Cover and framing. |
| 3–4 | AI-accelerated offense; Zero Trust history and principles; make attacks impossible or prohibitively tedious. |
| 5–6 | Agent definition; autonomy, tool use, MCP, contextual decision-making, multi-agent coordination; least agency. |
| 7–8 | Section framing. |
| 9 | Direct and indirect prompt injection; tool poisoning, rug pulls, harmful tool chaining, runaway loops, identity weaknesses. |
| 10 | Privilege inheritance and confused deputy behavior; cached credentials; dependency and model supply-chain compromise; persistent memory attacks. |
| 11 | RAG and shared-context poisoning; cross-session influence; cascading errors and behavioral drift. |
| 12 | Section framing. |
| 13–15 | Per-agent identity, authentication, least privilege, just-in-time and task-scoped authority, isolation, and authorization boundaries. |
| 16–17 | Sandbox and workload controls; logging, traces, behavioral baselines, anomaly detection, and configuration-change visibility. |
| 18–20 | Input and output controls, human approval, policy enforcement, automated response, rollback, configuration integrity, and governance. |
| 21–22 | Section framing and summary. |
| 23–24 | AI/model/tool supply-chain inventory, provenance, trust, and version control. |
| 25–27 | Prompt-injection defenses, tool controls, parameter checks, sandboxing, credentials, OAuth, and MCP trust boundaries. |
| 28–29 | Multi-agent security, communication and delegation boundaries, memory integrity, retention, and restore. |
| 30 | Coverage, explainability, drift, and continuous verification. |
| 31–33 | Response planning, containment, kill/revocation, recovery, adversarial exercises, and mapping to existing security operations. |
| 34–36 | Closing recommendations, related security-program material, and publication end matter. |

## OWASP page map

| PDF pages | Material used in the deck |
|---|---|
| 1–3 | Cover, contributors, purpose, scope, and contents. |
| 4–8 | Agentic-system concepts, autonomy, tool use, planning, memory, and the evolution from model to agent. |
| 9–12 | Reference architecture, components, trust boundaries, protocols, orchestration, tools, memory, and environmental interfaces. |
| 13–16 | Identity and authorization, confused-deputy risk, RAG and cascading hallucinations, human oversight, goal manipulation, deceptive behavior, logging, and rogue agents. |
| 17–20 | Detailed threat catalog T1–T17, including memory poisoning, tool misuse, privilege compromise, code execution, communication poisoning, rogue agents, human manipulation, cascading hallucinations, and denial of service. |
| 21 | Taxonomy transition. |
| 22–33 | Threat-taxonomy navigator with definitions, scenarios, affected components, and relationships covering prompt, goal, memory, tool, identity, data, protocol, supply-chain, consent, and multi-agent threats. |
| 34 | Mitigation transition. |
| 35–43 | Mitigation playbooks: governance, prompt/context controls, memory/RAG controls, tool/runtime controls, identity, human oversight, monitoring, containment, multi-agent communication, and recovery. |
| 44–50 | Worked scenarios and examples showing how risks and mitigations compose in practical agent flows. |
| 51–53 | Closing material and end matter. |

## Synthesis principles applied

1. The supplied nine-parent, 53-child hierarchy and baseline severities were preserved exactly.
2. Ratings are explicitly labeled as synthesized architectural baselines, not as ratings published by Anthropic or OWASP.
3. Prompt instructions are treated as a risk-reduction layer, never as an enforceable identity, authorization, execution, network, or recovery boundary.
4. Mitigations prioritize architecture-level prevention, detection, and response and use calibrated verbs such as *reduces*, *limits*, *detects*, and *contains*.
5. Linked evidence was used only where it materially clarified a demonstrated attack pattern, implementation control, research result, or standard.
6. No statistics were copied into the visible presentation unless necessary. The deck relies on qualitative, source-traceable architecture claims.

## Page citation conventions

Risk slides use compact citations such as:

- `Anthropic, Zero Trust for AI Agents, pp. 9–15`
- `OWASP, Agentic AI: Threats and Mitigations v1.1, pp. 13–19`

Each citation is a hyperlink to the original PDF. Where a reviewed Claude-linked source materially adds evidence, the slide footer names and links it separately.
