import type { QualificationEval } from '../lib/fitScore';

export function QualificationList({ items }: { items: QualificationEval[] }) {
  if (items.length === 0) {
    return <p className="gcap">이 공고는 별도 필수 자격 조건이 없어요.</p>;
  }
  return (
    <div>
      {items.map((q) => (
        <div className="qual-row" key={q.key}>
          <div>
            <div className="name">{q.label}</div>
            <div className="detail">{q.detail}</div>
          </div>
          <div className={`mark ${q.status}`}>{q.status === 'o' ? 'O' : 'X'}</div>
        </div>
      ))}
    </div>
  );
}
