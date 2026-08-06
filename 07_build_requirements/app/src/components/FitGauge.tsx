import type { ConditionEval } from '../lib/fitScore';

const STATUS_LABEL: Record<ConditionEval['status'], string> = {
  met: '충족',
  check: '확인 필요',
  adjust: '조정 필요',
};

const STATUS_PILL_CLASS: Record<ConditionEval['status'], string> = {
  met: 'pill met',
  check: 'pill chk',
  adjust: 'pill adj',
};

const STATUS_FILL_COLOR: Record<ConditionEval['status'], string> = {
  met: 'var(--orange)',
  check: 'var(--muted)',
  adjust: 'var(--gray)',
};

export function FitGauge({ evals }: { evals: ConditionEval[] }) {
  return (
    <div>
      {evals.map((e) => (
        <div className="gauge-row" key={e.key}>
          <div className="top">
            <span className="label">{e.label}</span>
            <span className={STATUS_PILL_CLASS[e.status]}>{STATUS_LABEL[e.status]}</span>
          </div>
          {e.dashed ? (
            <div className="track dashed" />
          ) : (
            <div className="track">
              <div
                className="fill"
                style={{ width: `${e.fillPercent}%`, background: STATUS_FILL_COLOR[e.status] }}
              />
              <div className="tick" style={{ left: `${e.tickPercent}%` }} />
            </div>
          )}
          <div className="gcap">{e.gcap}</div>
        </div>
      ))}
    </div>
  );
}
