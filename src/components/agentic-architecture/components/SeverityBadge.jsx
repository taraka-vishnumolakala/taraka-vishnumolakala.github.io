export default function SeverityBadge({ severity, compact = false }) {
  const marks = { Critical: '◆', High: '▲', Medium: '●', Low: '■' };

  return (
    <span className={`severity-badge severity-${severity.toLowerCase()} ${compact ? 'is-compact' : ''}`}>
      <span aria-hidden="true">{marks[severity]}</span>
      {severity}
    </span>
  );
}
