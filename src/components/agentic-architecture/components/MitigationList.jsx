export default function MitigationList({ mitigations }) {
  return (
    <ol className="mitigation-list">
      {mitigations.map((mitigation, index) => (
        <li key={`${mitigation.phase}-${index}`}>
          <span className={`phase phase-${mitigation.phase.toLowerCase()}`}>{mitigation.phase}</span>
          <span>{mitigation.text}</span>
        </li>
      ))}
    </ol>
  );
}
