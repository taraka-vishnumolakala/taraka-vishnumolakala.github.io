import ArchitecturePath from './ArchitecturePath';
import MitigationList from './MitigationList';
import SeverityBadge from './SeverityBadge';
import SourceFooter from './SourceFooter';

export default function RiskSlide({ risk, section, riskIndex }) {
  return (
    <section className="deck-slide risk-slide" data-severity={risk.severity.toLowerCase()}>
      <header className="risk-header">
        <div>
          <span className="risk-coordinate">
            {String(section.number).padStart(2, '0')}.{String(riskIndex + 1).padStart(2, '0')} · {section.title}
          </span>
          <h2>{risk.title}</h2>
        </div>
        <SeverityBadge severity={risk.severity} />
      </header>

      <p className="risk-statement">{risk.definition}</p>

      <div className="path-region">
        <span className="region-label">Attack or failure path</span>
        <ArchitecturePath steps={risk.path} />
      </div>

      <div className="risk-body">
        <div className="impact-panel">
          <span className="region-label">Potential impact</span>
          <ul>
            {risk.impacts.map((impact) => <li key={impact}>{impact}</li>)}
          </ul>
        </div>
        <div className="mitigation-panel">
          <span className="region-label">Potential mitigations</span>
          <MitigationList mitigations={risk.mitigations} />
        </div>
      </div>

      <div className="severity-rationale">
        <span>Why {risk.severity}</span>
        <p>{risk.rationale}</p>
      </div>

      <SourceFooter citations={risk.citations} supporting={risk.supporting} />

      <aside className="notes">
        <p><strong>Baseline qualification.</strong> This is a synthesized architectural baseline, not a publisher-assigned severity.</p>
        <p><strong>Context modifiers.</strong> {risk.modifiers}</p>
        <p><strong>Architecture-review question.</strong> {risk.reviewPrompt}</p>
        <p><strong>Source detail.</strong> {risk.citations.join('; ')}{risk.supporting ? `; supporting first-hop source reviewed from the Claude PDF: ${risk.supporting.label}.` : '.'}</p>
      </aside>
    </section>
  );
}
