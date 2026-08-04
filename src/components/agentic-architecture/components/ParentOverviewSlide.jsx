import SeverityBadge from './SeverityBadge';

export default function ParentOverviewSlide({ section }) {
  const counts = section.risks.reduce((result, risk) => {
    result[risk.severity] = (result[risk.severity] || 0) + 1;
    return result;
  }, {});

  return (
    <section className="deck-slide parent-overview" data-section={section.number}>
      <div className="section-index">Risk family {String(section.number).padStart(2, '0')} / 09</div>
      <div className="overview-grid">
        <div className="overview-intro">
          <h2>{section.title}</h2>
          <p className="overview-description">{section.description}</p>

          <div className="boundary-card">
            <span className="card-kicker">Principal trust boundary</span>
            <strong>{section.boundary}</strong>
          </div>

          <div className="theme-list">
            <span className="card-kicker">Shared mitigation themes</span>
            {section.themes.map((theme, index) => (
              <div key={theme}><span>{String(index + 1).padStart(2, '0')}</span>{theme}</div>
            ))}
          </div>
        </div>

        <div className="risk-register">
          <div className="register-heading">
            <span>{section.risks.length} child risks</span>
            <span>{Object.entries(counts).map(([severity, count]) => `${count} ${severity}`).join(' · ')}</span>
          </div>
          <ol>
            {section.risks.map((risk, index) => (
              <li key={risk.id}>
                <span className="risk-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="risk-name">{risk.title}</span>
                <SeverityBadge severity={risk.severity} compact />
              </li>
            ))}
          </ol>
        </div>
      </div>
      <aside className="notes">
        <p>Use this slide to establish the trust boundary before discussing individual failures.</p>
        <p>The severity labels shown here are synthesized architectural baselines, not ratings assigned by Anthropic or OWASP.</p>
        <p>Architecture review question: which component actually enforces each shared mitigation when the model behaves unexpectedly?</p>
      </aside>
    </section>
  );
}
