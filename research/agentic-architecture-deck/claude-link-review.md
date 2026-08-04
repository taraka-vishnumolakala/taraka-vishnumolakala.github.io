# Claude PDF external-link review

Source PDF: [Anthropic / Claude, *Zero Trust for AI Agents*](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a1611a04085d7cd3dadc924_Claude-eBook-Zero-Trust-for-AI-Agents-05182026.pdf)  
Review date: **August 1, 2026**  
Method: annotation and visible-URL extraction; URL normalization and deduplication; exactly one-hop review of each destination; redirect target reviewed; no recursive browsing.

The extraction produced **37 unique normalized external destinations**. The embedded-link text below is a cleaned descriptive label where the PDF's geometric text extraction was fragmented.

| # | PDF page | Embedded link text | Original URL | Final URL | Access | Relevant finding | Used |
|---:|---:|---|---|---|---|---|:---:|
| 1 | 3 | Mythos preview | `https://red.anthropic.com/2026/mythos-preview/` | `https://www.anthropic.com/research/mythos-preview` | Accessible; redirected | Context on evolving cyber-capable model behavior; not required for a specific risk. | No |
| 2 | 4 | NIST SP 800-207 Zero Trust Architecture | `https://csrc.nist.gov/pubs/sp/800/207/final` | Same | Accessible | Zero Trust removes implicit trust based on network location or ownership and requires authentication and authorization before resource access. | Yes |
| 3 | 4 | NSA Zero Trust Implementation Guides | `https://www.nsa.gov/Press-Room/Cybersecurity-Advisories-Guidance/` | Same | Accessible, generic index | The destination was a broad advisory index; no risk-specific finding was relied on. | No |
| 4 | 6 | OWASP Top 10 for Agentic Applications 2026 | `https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/` | Same | Accessible | Additional taxonomy context; the required hierarchy and OWASP v1.1 PDF already supplied the needed material. | No |
| 5 | 9 | MITRE ATLAS direct prompt injection | `https://atlas.mitre.org/techniques/AML.T0051.000` | Same | **404 / inaccessible** | No content inferred. | No |
| 6 | 9 | Universal and transferable adversarial attacks | `https://arxiv.org/abs/2307.15043` | Same | Accessible | Research demonstrates automated adversarial suffixes that can transfer across aligned model families; useful context but not needed in the final visible deck. | No |
| 7 | 9 | MITRE ATLAS indirect prompt injection | `https://atlas.mitre.org/techniques/AML.T0051.001` | Same | **404 / inaccessible** | No content inferred. | No |
| 8 | 9 | Microsoft Research: Spotlighting | `https://www.microsoft.com/en-us/research/publication/defending-against-indirect-prompt-injection-attacks-with-spotlighting/` | Same | Accessible | Transforming untrusted content can help a model distinguish instructions from data, but it is a risk reduction rather than a complete boundary. | No |
| 9 | 9 | Invariant Labs MCP GitHub vulnerability | `https://invariantlabs.ai/blog/mcp-github-vulnerability` | Same | Accessible | A malicious issue could indirectly steer an agent to read private repositories and use a trusted GitHub path to publish data; tool composition and dataflow policy are central. | Yes |
| 10 | 9 | Koi Security Postmark MCP backdoor | `https://www.koi.ai/blog/postmark-mcp-npm-malicious-backdoor-email-theft` | Same | Accessible | A malicious package version copied emails while retaining expected behavior, illustrating trusted-tool drift and supply-chain exfiltration. | Yes |
| 11 | 9 | CrowdStrike agentic tool-chain attacks | `https://www.crowdstrike.com/en-us/blog/how-agentic-tool-chain-attacks-threaten-ai-agent-security/` | Same | Accessible | Tool metadata and version changes can produce poisoning, shadowing, and rug pulls; signed manifests, pinning, parameter validation, boundary checks, and observability reduce exposure. | Yes |
| 12 | 10 | Anthropic Sleeper Agents research | `https://www.anthropic.com/research/sleeper-agents-training-deceptive-llms-that-persist-through-safety-training` | Same | Accessible | Proof-of-concept backdoored behavior persisted through several safety-training methods, supporting architecture-level containment even after behavioral testing. | Yes |
| 13 | 10 | PyTorch dependency-chain compromise | `https://www.bleepingcomputer.com/news/security/pytorch-discloses-malicious-dependency-chain-compromise-over-holidays/` | Same | Accessible | A dependency-confusion package exfiltrated host information and SSH keys, illustrating the runtime authority of trusted dependencies. | Yes |
| 14 | 10 | JFrog malicious Hugging Face models | `https://jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/` | Same | Accessible | Malicious model artifacts could execute code and establish reverse shells when loaded, supporting safe formats, provenance, and isolated loading. | Yes |
| 15 | 10 | OpenSSF Scorecard | `https://securityscorecards.dev/` | Same | Accessible | Automated checks cover project health and security signals such as maintenance, review, pinned dependencies, branch protection, and signed releases. | Yes |
| 16 | 10 | Zenity AgentFlayer | `https://labs.zenity.io/p/agentflayer-chatgpt-connectors-0click-attack-5b41` | Same | Accessible | Indirect instructions in a document combined connector retrieval and an automatically rendered external image request to leak data without an additional click. | Yes |
| 17 | 11 | AgentPoison | `https://arxiv.org/abs/2407.12784` | Same | Accessible | Poisoned memory or retrieval content can create trigger-specific malicious retrieval and targeted downstream behavior. | Yes |
| 18 | 16 | Claude Code permission system | `https://code.claude.com/docs/en/permissions#permission-system` | `https://code.claude.com/docs/en/permissions` | Accessible; fragment normalized | Permission decisions are enforced by the client with allow, ask, and deny policies, illustrating an architectural boundary outside the model. | Yes |
| 19 | 16 | Claude Code sandboxing | `https://code.claude.com/docs/en/sandboxing` | Same | Accessible | Filesystem and network isolation, restricted egress, and credential handling constrain code and tool execution. | Yes |
| 20 | 16 | Claude Code security protections | `https://code.claude.com/docs/en/security#built-in-protections` | `https://code.claude.com/docs/en/security` | Accessible; fragment normalized | Product-specific prompt, command, network, and execution safeguards; no single claim needed an extra citation in the final deck. | No |
| 21 | 17 | Claude Code monitoring | `https://code.claude.com/docs/en/monitoring-usage` | Same | Accessible | OpenTelemetry metrics, events, and traces can correlate prompts, API activity, and tool use while allowing content redaction. | Yes |
| 22 | 17 | Claude Code hooks | `https://code.claude.com/docs/en/hooks` | Same | Accessible | Pre-tool hooks can allow, deny, request approval, or modify tool input, illustrating deterministic parameter and action gates. | Yes |
| 23 | 18 | Spotlighting paper | `https://arxiv.org/pdf/2403.14720` | Same | Accessible PDF | The paper frames the absence of a true control/data channel separation in current model input and presents spotlighting as a partial defense, not a guarantee. | No |
| 24 | 19 | Anthropic Constitutional Classifiers | `https://www.anthropic.com/research/constitutional-classifiers` | Same | Accessible | Research on classifier-based defenses; not necessary for the architecture-level controls selected for the final deck. | No |
| 25 | 20 | Claude Code settings | `https://code.claude.com/docs/en/settings` | Same | Accessible | Managed settings, MCP restrictions, and configuration scope illustrate protected, centrally enforceable configuration and drift control. | Yes |
| 26 | 23 | OWASP AIBOM Generator | `https://genai.owasp.org/resource/owasp-aibom-generator/` | Same | Accessible | Supports structured inventory of models and AI components; the final slide uses broader inventory guidance from the primary PDFs. | No |
| 27 | 23 | Anthropic ISO 42001 certification | `https://www.anthropic.com/news/anthropic-achieves-iso-42001-certification-for-responsible-ai` | Same | Accessible | Governance context, but not a risk-specific technical control used in the presentation. | No |
| 28 | 25 | How to configure hooks | `https://claude.com/blog/how-to-configure-hooks` | Same | Accessible | Product implementation examples for tool hooks; the canonical hook documentation was preferred. | No |
| 29 | 27 | Claude Code sandboxing engineering article | `https://www.anthropic.com/engineering/claude-code-sandboxing` | Same | Accessible | Engineering rationale for OS-enforced filesystem and network isolation; canonical docs were sufficient in the deck. | No |
| 30 | 27 | Remote MCP authentication | `https://code.claude.com/docs/en/mcp#authenticate-with-remote-mcp-servers` | `https://code.claude.com/docs/en/mcp` | Accessible; fragment normalized | Remote MCP connections require trust review and scoped authentication; server content can introduce prompt-injection risk. | Yes |
| 31 | 27 | Claude Code IAM access control | `https://code.claude.com/docs/en/iam#access-control-and-permissions` | Unresolved | **Unavailable or moved** | The destination did not render successfully; no content inferred. | No |
| 32 | 29 | Claude Code data usage | `https://code.claude.com/docs/en/data-usage` | Same | Accessible | Product-specific data handling and retention context; primary sources were used for the general retention risk. | No |
| 33 | 29 | Claude Code checkpointing | `https://code.claude.com/docs/en/checkpointing` | Same | Accessible | Tracks file edits and supports rewind, while not replacing version control; used as a product-specific illustration of recoverability. | Yes |
| 34 | 33 | MITRE ATT&CK | `https://attack.mitre.org/` | Same | Accessible | A knowledge base of adversary tactics and techniques; useful operational context but not a risk-specific deck citation. | No |
| 35 | 33 | Atomic Red Team | `https://atomicredteam.io/` | `https://www.atomicredteam.io/` | Accessible; redirected | Provides small tests mapped to ATT&CK techniques; not used in a visible risk citation. | No |
| 36 | 35 | Preparing your security program for AI-accelerated offense | `https://claude.com/blog/preparing-your-security-program-for-ai-accelerated-offense` | Same | Accessible | Security-program context for faster adversary operations; the primary PDFs provided the response material used in the deck. | No |
| 37 | 36 | claude.ai | `https://claude.ai/` | `https://claude.ai/login` | Accessible; redirected to login | Login landing page; no relevant material used. | No |

## Inaccessible or non-substantive destinations

- MITRE ATLAS `AML.T0051.000` and `AML.T0051.001` returned 404.
- The Claude Code IAM deep link was unavailable or moved during review.
- The NSA URL resolved to a generic advisory index rather than a specific Zero Trust implementation guide.
- `claude.ai` redirected to a login page. No authentication or access restriction was bypassed.

No findings were guessed for inaccessible destinations.
