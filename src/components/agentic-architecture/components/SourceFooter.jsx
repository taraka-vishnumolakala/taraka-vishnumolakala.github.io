import { primarySources } from '../data/riskSections';

function sourceUrl(citation) {
  return citation.startsWith('Anthropic') ? primarySources.anthropic.url : primarySources.owasp.url;
}

export default function SourceFooter({ citations, supporting }) {
  return (
    <footer className="source-footer">
      <span className="source-label">Evidence</span>
      <span className="source-links">
        {citations.map((citation, index) => (
          <span key={citation}>
            {index > 0 && <span className="source-separator"> · </span>}
            <a href={sourceUrl(citation)} target="_blank" rel="noreferrer">{citation}</a>
          </span>
        ))}
        {supporting && (
          <>
            <span className="source-separator"> · </span>
            <a href={supporting.url} target="_blank" rel="noreferrer">
              Supporting Claude-linked source: {supporting.label}
            </a>
          </>
        )}
      </span>
    </footer>
  );
}
