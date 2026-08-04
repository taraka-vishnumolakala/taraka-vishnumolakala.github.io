export default function ArchitecturePath({ steps }) {
  return (
    <div className="architecture-path" aria-label={`Attack or failure path: ${steps.join(' to ')}`}>
      {steps.map((step, index) => (
        <div className="path-step-wrap" key={step}>
          <div className="path-step">
            <span className="path-number">{String(index + 1).padStart(2, '0')}</span>
            <span>{step}</span>
          </div>
          {index < steps.length - 1 && <span className="path-arrow" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  );
}
