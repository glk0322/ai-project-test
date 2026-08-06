import type { ConditionEval } from '../lib/fitScore';
import { fitVerdict } from '../lib/fitScore';

export function FitSegments({ evals }: { evals: ConditionEval[] }) {
  const verdict = fitVerdict(evals);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div className="seg">
        {evals.map((e) => (
          <span key={e.key} className={e.status === 'met' ? 'on' : e.status === 'check' ? 'chk' : 'off'} />
        ))}
      </div>
      <span className={`verdict ${verdict.tone !== 'met' ? 'dim' : ''}`}>{verdict.label}</span>
    </div>
  );
}
