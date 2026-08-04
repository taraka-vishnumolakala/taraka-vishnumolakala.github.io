import { useEffect, useMemo, useRef, useState } from 'react';
import 'reveal.js/dist/reveal.css';
import './AgenticArchitectureDeck.css';
import ParentOverviewSlide from './ParentOverviewSlide';
import RiskSlide from './RiskSlide';
import SeverityBadge from './SeverityBadge';
import architectureImage from '../../../content/blog/securing-agentic-architecture/diagrams/secure-agentic-architecture-reference.png';
import {
  allRisks,
  linkedSources,
  primarySources,
  riskSections,
  severityCounts,
  severityOrder,
} from '../data/riskSections';

const accessed = 'August 1, 2026';

function SourceCard({ title, subtitle, url }) {
  return (
    <a className="source-card" href={url} target="_blank" rel="noreferrer">
      <span>{subtitle}</span>
      <strong>{title}</strong>
      <small>Open original source ↗</small>
    </a>
  );
}

function TitleSlide() {
  return (
    <section className="deck-slide title-slide">
      <h1>Secure Agentic Architecture Field Guide</h1>
      <div className="title-visual">
        <img
          src={architectureImage.src}
          alt="Reference architecture showing an agent runtime, its local capabilities, governed access to protected systems, and external model access"
        />
      </div>
    </section>
  );
}

function LandscapeSlide() {
  const total = allRisks.length;
  return (
    <section className="deck-slide landscape-slide">
      <div className="slide-heading">
        <span className="section-index">Risk landscape</span>
        <h2>Nine trust-boundary families · {total} child risks</h2>
      </div>
      <div className="landscape-layout">
        <div className="family-map">
          {riskSections.map((section) => (
            <div className="family-row" key={section.id}>
              <span>{String(section.number).padStart(2, '0')}</span>
              <strong>{section.title}</strong>
              <div className="severity-dots" aria-label={`${section.risks.length} child risks`}>
                {section.risks.map((risk) => <i className={`dot dot-${risk.severity.toLowerCase()}`} key={risk.id} title={`${risk.title}: ${risk.severity}`} />)}
              </div>
              <em>{section.risks.length}</em>
            </div>
          ))}
        </div>
        <div className="landscape-summary">
          <span className="card-kicker">Baseline distribution</span>
          {severityOrder.map((severity) => (
            <div key={severity}>
              <SeverityBadge severity={severity} compact />
              <strong>{severityCounts[severity] || 0}</strong>
              <span>{Math.round(((severityCounts[severity] || 0) / total) * 100)}%</span>
            </div>
          ))}
          <p>Risk concentrates where autonomous reasoning crosses into identity, execution, egress, shared state, or production control.</p>
        </div>
      </div>
      <aside className="notes">
        <p>The dots show the required severity distribution without replacing the exact hierarchy.</p>
        <p>Navigate horizontally across families and vertically into the child risks inside each family.</p>
      </aside>
    </section>
  );
}

function CriticalSummarySlide() {
  const critical = allRisks.filter((risk) => risk.severity === 'Critical');
  const outcomes = [
    ['Identity takeover', 'Stolen or inherited authority becomes valid machine action.'],
    ['Execution & production control', 'Tool or code paths turn manipulated reasoning into irreversible effects.'],
    ['Exfiltration & external side effects', 'Read access composes with egress, messaging, or publication.'],
    ['Cross-boundary propagation', 'Tenants, agents, protocols, and shared integrations amplify one compromise.'],
    ['Loss of containment', 'Revocation, escalation, or trusted recovery fails when it matters.'],
  ];
  return (
    <section className="deck-slide critical-summary">
      <div className="slide-heading">
        <span className="section-index">Cross-cutting critical-risk summary</span>
        <h2>{critical.length} Critical baselines converge on five outcomes</h2>
      </div>
      <div className="outcome-grid">
        {outcomes.map(([title, text], index) => (
          <div className="outcome-card" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <p className="critical-takeaway">The decisive design question is not “Can the model be instructed to behave?” It is “Which enforcement point still holds when it does not?”</p>
      <aside className="notes">
        <p>Critical ratings are not a count of likely incidents. They mark credible paths to the high-impact outcomes defined in the methodology.</p>
        <p>Use the five outcomes to prioritize threat modeling around the most consequential trust-boundary crossings.</p>
      </aside>
    </section>
  );
}

function MitigationThemesSlide() {
  const controls = [
    ['Identity plane', 'Unique workload identity · scoped delegation · short-lived credentials'],
    ['Context plane', 'Trust labels · provenance · tenant isolation · validated memory writes'],
    ['Action plane', 'Typed tools · policy gates · sandboxing · budgets · contextual approval'],
    ['Egress plane', 'Source-to-destination policy · secret isolation · output and recipient checks'],
    ['Response plane', 'End-to-end traces · anomaly detection · kill · revocation · trusted restore'],
  ];
  return (
    <section className="deck-slide mitigation-themes">
      <div className="slide-heading">
        <span className="section-index">Prioritized mitigation themes</span>
        <h2>Build one enforceable control spine across the agent path</h2>
      </div>
      <div className="control-spine">
        {controls.map(([title, text], index) => (
          <div className="control-stage" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="control-priorities">
        <div><strong>Start here</strong><span>Inventory agents, identities, tools, data, protocols, and decision authority.</span></div>
        <div><strong>Then constrain</strong><span>Reduce agency and enforce authorization at the moment of each side effect.</span></div>
        <div><strong>Then prove</strong><span>Trace intent to effect and rehearse granular containment and trusted recovery.</span></div>
      </div>
      <aside className="notes">
        <p>This is a cross-cutting control view, not a replacement hierarchy. Each risk remains owned within its specified family.</p>
        <p>Prompt hardening can reduce some attacks, but it cannot replace identity, execution, network, and recovery controls.</p>
      </aside>
    </section>
  );
}

function ClosingSlide() {
  return (
    <section className="deck-slide closing-slide">
      <div className="closing-number">53</div>
      <div className="closing-copy">
        <span className="section-index">Closing takeaways</span>
        <h2>Security architecture must own the gap between intent and effect.</h2>
        <ol>
          <li><span>01</span>Assume external content, memory, peer messages, and tool metadata can influence reasoning.</li>
          <li><span>02</span>Keep authority smaller, shorter-lived, and more task-specific than the agent’s general capability.</li>
          <li><span>03</span>Authorize complete dataflows and action chains, not isolated tool calls.</li>
          <li><span>04</span>Design observability, revocation, and restoration before granting production autonomy.</li>
        </ol>
      </div>
      <aside className="notes">
        <p>Close on ownership: model behavior may be uncertain, but the architecture determines what the model can read, change, send, delegate, and survive.</p>
      </aside>
    </section>
  );
}

function PrimarySourcesSlide() {
  return (
    <section className="deck-slide sources-slide">
      <div className="slide-heading">
        <span className="section-index">Sources · 01 / 04</span>
        <h2>Primary sources</h2>
      </div>
      <div className="primary-source-grid">
        <SourceCard title="Zero Trust for AI Agents" subtitle="Anthropic / Claude · reviewed in full: 36 PDF pages" url={primarySources.anthropic.url} />
        <SourceCard title="Agentic AI: Threats and Mitigations v1.1" subtitle="OWASP · reviewed in full: 53 PDF pages" url={primarySources.owasp.url} />
      </div>
      <div className="source-method-grid">
        <div><strong>Claude PDF links</strong><span>37 normalized external destinations reviewed exactly one hop.</span></div>
        <div><strong>OWASP PDF links</strong><span>No external destination opened, per the research constraint.</span></div>
        <div><strong>Access date</strong><span>{accessed}</span></div>
      </div>
      <aside className="notes"><p>The complete page-level source notes and hyperlink log are published with the project files.</p></aside>
    </section>
  );
}

function LinkedSourcesSlide({ page, items }) {
  return (
    <section className="deck-slide sources-slide linked-sources-slide">
      <div className="slide-heading">
        <span className="section-index">Sources · {String(page + 1).padStart(2, '0')} / 04</span>
        <h2>Claude-linked evidence used · {page} / 2</h2>
      </div>
      <div className="linked-source-list">
        {items.map((item, index) => (
          <a href={item.url} target="_blank" rel="noreferrer" key={item.url}>
            <span>{String((page - 1) * 8 + index + 1).padStart(2, '0')}</span>
            <strong>{item.label}</strong>
            <em>Original source ↗</em>
          </a>
        ))}
      </div>
      <aside className="notes"><p>Only linked pages that materially improved a risk explanation or mitigation appear here. The full 37-link review log records all destinations.</p></aside>
    </section>
  );
}

function LimitationsSlide() {
  return (
    <section className="deck-slide sources-slide limitations-slide">
      <div className="slide-heading">
        <span className="section-index">Sources · 04 / 04</span>
        <h2>Research limitations and interpretation</h2>
      </div>
      <div className="limitations-grid">
        <div><span>01</span><strong>Synthesized ratings</strong><p>Baseline severities are architecture-review judgments that preserve the supplied hierarchy; they are not publisher-assigned scores.</p></div>
        <div><span>02</span><strong>Point-in-time review</strong><p>Linked destinations were reviewed on {accessed}; web content, documentation, and availability can change.</p></div>
        <div><span>03</span><strong>Inaccessible destinations</strong><p>Two MITRE ATLAS technique URLs returned 404. One Claude Code IAM deep link was unavailable or moved. No content was inferred.</p></div>
        <div><span>04</span><strong>Architecture context matters</strong><p>Local severity changes with authority, data, autonomy, execution, egress, propagation, reversibility, and response capability.</p></div>
      </div>
      <div className="limitations-footer">
        <a href={primarySources.anthropic.url} target="_blank" rel="noreferrer">Anthropic PDF ↗</a>
        <a href={primarySources.owasp.url} target="_blank" rel="noreferrer">OWASP PDF ↗</a>
        <span>Research completed {accessed}</span>
      </div>
      <aside className="notes"><p>The NSA advisory index and Claude login destination were accessible but not used as substantive evidence because they did not add risk-specific material.</p></aside>
    </section>
  );
}

export default function AgenticArchitectureDeck() {
  const revealRef = useRef(null);
  const deckInstanceRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const usedLinkedSources = useMemo(() => {
    const urls = new Set(allRisks.map((risk) => risk.supporting?.url).filter(Boolean));
    return Object.values(linkedSources).filter((item) => urls.has(item.url));
  }, []);

  useEffect(() => {
    let active = true;
    const initialize = async () => {
      const printMode = new URLSearchParams(window.location.search).has('print-pdf');
      if (printMode) document.documentElement.classList.add('deck-print-mode');
      const [{ default: Reveal }, { default: Notes }] = await Promise.all([
        import('reveal.js'),
        import('reveal.js/plugin/notes/notes.esm.js'),
      ]);
      if (!active || !revealRef.current) return;

      const deck = new Reveal(revealRef.current, {
        embedded: true,
        hash: true,
        history: true,
        controls: true,
        controlsTutorial: false,
        progress: true,
        slideNumber: 'c/t',
        overview: true,
        keyboard: true,
        touch: true,
        center: false,
        transition: 'fade',
        backgroundTransition: 'fade',
        width: 1280,
        height: 720,
        margin: 0,
        minScale: 0.2,
        maxScale: 1.2,
        pdfSeparateFragments: false,
        plugins: [Notes],
      });
      deckInstanceRef.current = deck;
      await deck.initialize();
      const keepDeckInView = () => {
        const shell = revealRef.current?.closest('.agentic-deck-shell');
        if (!shell?.classList.contains('is-browser-fullscreen') && !printMode) {
          if (shell) {
            const top = shell.getBoundingClientRect().top + window.scrollY - 88;
            window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
          }
        }
      };
      deck.on('slidechanged', keepDeckInView);
      if (window.location.hash && window.location.hash !== '#/' && window.location.hash !== '#') {
        keepDeckInView();
      }
      if (active) setReady(true);
    };

    initialize();
    return () => {
      active = false;
      document.documentElement.classList.remove('deck-print-mode');
      deckInstanceRef.current?.destroy();
      deckInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('deck-browser-fullscreen', fullscreen);
    const layoutFrame = window.requestAnimationFrame(() => deckInstanceRef.current?.layout());

    if (!fullscreen) return () => window.cancelAnimationFrame(layoutFrame);

    const exitOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      setFullscreen(false);
    };

    window.addEventListener('keydown', exitOnEscape, true);
    return () => {
      window.cancelAnimationFrame(layoutFrame);
      window.removeEventListener('keydown', exitOnEscape, true);
      document.documentElement.classList.remove('deck-browser-fullscreen');
    };
  }, [fullscreen]);

  const toggleFullscreen = () => setFullscreen((current) => !current);

  return (
    <div className={`agentic-deck-shell${fullscreen ? ' is-browser-fullscreen' : ''}`}>
      <div className="deck-toolbar">
        <div>
          <span className={`deck-status ${ready ? 'is-ready' : ''}`} aria-live="polite">{ready ? 'Slides loaded' : 'Loading slides'}</span>
          <span className="deck-hint">← → families · ↑ ↓ risks · Esc overview</span>
        </div>
        <button type="button" onClick={toggleFullscreen} aria-pressed={fullscreen}>
          {fullscreen ? 'Exit presentation' : 'Present in browser'}
        </button>
      </div>
      <div className="reveal agentic-reveal" ref={revealRef} aria-label="Securing Agentic Architecture presentation">
        <div className="slides">
          <TitleSlide />
          <LandscapeSlide />

          {riskSections.map((section) => (
            <section key={section.id}>
              <ParentOverviewSlide section={section} />
              {section.risks.map((risk, riskIndex) => (
                <RiskSlide key={risk.id} risk={risk} section={section} riskIndex={riskIndex} />
              ))}
            </section>
          ))}

          <CriticalSummarySlide />
          <MitigationThemesSlide />
          <ClosingSlide />
          <section>
            <PrimarySourcesSlide />
            <LinkedSourcesSlide page={1} items={usedLinkedSources.slice(0, 8)} />
            <LinkedSourcesSlide page={2} items={usedLinkedSources.slice(8)} />
            <LimitationsSlide />
          </section>
        </div>
      </div>
    </div>
  );
}
