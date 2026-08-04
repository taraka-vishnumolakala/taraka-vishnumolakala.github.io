import { pathToFileURL } from 'node:url';
import path from 'node:path';

const dataPath = path.resolve(process.argv[2] || './src/components/agentic-architecture/data/riskSections.js');
const { riskSections } = await import(pathToFileURL(dataPath));

const expected = [
  ['Agent identity, access, and boundaries', [
    ['Identity spoofing and credential compromise', 'Critical'],
    ['Excessive agency and overprivileged access', 'Critical'],
    ['Privilege inheritance and confused-deputy attacks', 'Critical'],
    ['Weak workload isolation and lateral movement', 'High'],
    ['Missing per-agent identity and accountability', 'High'],
  ]],
  ['Prompt, intent, and reasoning security', [
    ['Direct prompt injection', 'High'], ['Indirect prompt injection', 'Critical'],
    ['Intent breaking and goal manipulation', 'Critical'], ['Plan and reflection-loop manipulation', 'High'],
    ['Misaligned or deceptive behavior', 'High'],
  ]],
  ['Tool, code, and action security', [
    ['Tool poisoning and rug-pull attacks', 'Critical'], ['Tool misuse and harmful tool chaining', 'Critical'],
    ['Tool-parameter manipulation', 'High'], ['Unexpected code execution and RCE', 'Critical'],
    ['Runaway loops and resource exhaustion', 'High'], ['Unauthorized consequential actions', 'Critical'],
  ]],
  ['Memory, RAG, and context security', [
    ['Persistent memory poisoning', 'High'], ['RAG and vector-store poisoning', 'High'],
    ['Cross-session or cross-tenant contamination', 'Critical'], ['Cascading hallucinations', 'High'],
    ['Long-term behavioral drift', 'High'], ['Sensitive-context over-retention', 'Medium'],
  ]],
  ['Multi-agent and protocol security', [
    ['Agent communication poisoning', 'High'], ['Rogue agents and infectious backdoors', 'Critical'],
    ['Delegation and approval manipulation', 'Critical'], ['False consensus and coordinated failure', 'High'],
    ['MCP or A2A protocol abuse', 'Critical'], ['Insecure inter-agent authentication', 'Critical'],
  ]],
  ['Data and output protection', [
    ['Sensitive-data exfiltration', 'Critical'], ['Credential or secret disclosure', 'Critical'],
    ['Encoded or semantic data leakage', 'High'], ['Harmful or misleading outputs', 'High'],
    ['Unauthorized external communications', 'Critical'], ['Inadequate output approval controls', 'High'],
  ]],
  ['Supply-chain and integrity risks', [
    ['Compromised models or training data', 'Critical'], ['Malicious frameworks, packages, or MCP servers', 'Critical'],
    ['Prompt, configuration, or agent-card tampering', 'Critical'], ['Unsigned or unverified updates', 'High'],
    ['Unmaintained or vulnerable dependencies', 'High'], ['Runtime configuration drift', 'High'],
  ]],
  ['Human interaction and oversight', [
    ['Human-in-the-loop overload', 'High'], ['Approval fatigue and rubber-stamping', 'High'],
    ['Human manipulation and social engineering', 'High'], ['Consent-flow manipulation', 'Critical'],
    ['Automation bias and overreliance', 'High'], ['Inadequate escalation for high-impact actions', 'Critical'],
  ]],
  ['Observability, response, and recovery', [
    ['Repudiation and untraceable actions', 'High'], ['Missing end-to-end decision provenance', 'High'],
    ['Undetected behavioral drift', 'High'], ['Slow detection and containment', 'High'],
    ['Ineffective credential revocation or kill switch', 'Critical'], ['Inability to restore trusted memory or configuration', 'High'],
    ['Insufficient forensic evidence', 'High'],
  ]],
];

const errors = [];
if (riskSections.length !== 9) errors.push(`Expected 9 sections; found ${riskSections.length}.`);

riskSections.forEach((section, sectionIndex) => {
  const [expectedTitle, expectedRisks] = expected[sectionIndex] || [];
  if (section.title !== expectedTitle) errors.push(`Section ${sectionIndex + 1}: expected “${expectedTitle}”; found “${section.title}”.`);
  if (section.risks.length !== expectedRisks.length) errors.push(`${section.title}: expected ${expectedRisks.length} risks; found ${section.risks.length}.`);

  section.risks.forEach((risk, riskIndex) => {
    const [expectedRiskTitle, expectedSeverity] = expectedRisks[riskIndex] || [];
    if (risk.title !== expectedRiskTitle) errors.push(`${section.title} risk ${riskIndex + 1}: title mismatch.`);
    if (risk.severity !== expectedSeverity) errors.push(`${risk.title}: expected ${expectedSeverity}; found ${risk.severity}.`);
    for (const field of ['definition', 'rationale', 'modifiers', 'reviewPrompt']) {
      if (!risk[field] || typeof risk[field] !== 'string') errors.push(`${risk.title}: missing ${field}.`);
    }
    if (!Array.isArray(risk.path) || risk.path.length !== 4) errors.push(`${risk.title}: attack path must contain 4 steps.`);
    if (!Array.isArray(risk.impacts) || risk.impacts.length < 3) errors.push(`${risk.title}: requires at least 3 impacts.`);
    if (!Array.isArray(risk.mitigations) || risk.mitigations.length < 3 || risk.mitigations.length > 6) errors.push(`${risk.title}: requires 3–6 mitigations.`);
    if (!Array.isArray(risk.citations) || risk.citations.length < 2) errors.push(`${risk.title}: requires both primary-source citations.`);
  });
});

const total = riskSections.reduce((sum, section) => sum + section.risks.length, 0);
if (total !== 53) errors.push(`Expected 53 child risks; found ${total}.`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const severityCounts = riskSections.flatMap((section) => section.risks).reduce((counts, risk) => {
  counts[risk.severity] = (counts[risk.severity] || 0) + 1;
  return counts;
}, {});

console.log(JSON.stringify({ sections: riskSections.length, risks: total, severityCounts }, null, 2));
