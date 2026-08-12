import type { ConditionEval } from '../lib/fitScore';
import { computeFitScore, fitHeadline, fitVerdict } from '../lib/fitScore';

export function FitSummary({ evals }: { evals: ConditionEval[] }) {
  const score = computeFitScore(evals);
  const verdict = fitVerdict(evals);
  const met = evals.filter((e) => e.status === 'met');
  const notMet = evals.filter((e) => e.status !== 'met');

  return (
    <div className="fit-summary">
      <div className="fit-summary-top">
        <div className="fit-summary-score">
          <span className="num">{score}%</span>
          <span className="headline">{fitHeadline(verdict.tone)}</span>
        </div>
        {notMet.length > 0 && (
          <span className="fit-tally">
            충족 {met.length} · 조정 {notMet.length}
          </span>
        )}
      </div>

      <div className="fitbar-track full">
        <div className="fitbar-fill" style={{ width: `${score}%` }} />
      </div>

      <div className="fit-groups">
        {met.length > 0 && (
          <div>
            <p className="fit-group-label met">충족한 조건</p>
            {met.map((e) => (
              <FitRow key={e.key} evalItem={e} tone="met" />
            ))}
          </div>
        )}
        {notMet.length > 0 && (
          <div>
            <p className="fit-group-label adjust">조정이 필요해요</p>
            {notMet.map((e) => (
              <FitRow key={e.key} evalItem={e} tone="adjust" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FitRow({ evalItem, tone }: { evalItem: ConditionEval; tone: 'met' | 'adjust' }) {
  return (
    <div className="fit-row">
      <span className={`fit-mark ${tone}`}>{tone === 'met' ? '✓' : '–'}</span>
      <div className="fit-row-text">
        <div className="name">{evalItem.label}</div>
        <div className="detail">{evalItem.gcap}</div>
      </div>
    </div>
  );
}
