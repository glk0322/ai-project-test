import { useNavigate } from 'react-router-dom';
import type { JobPosting, UserConditions, UserQualifications } from '../data/types';
import { evaluateConditions, evaluateQualifications, fitVerdict, computeFitScore } from '../lib/fitScore';
import { FitPercentBar } from './FitPercentBar';

function hint(evals: ReturnType<typeof evaluateConditions>): string | null {
  const adjust = evals.find((e) => e.status === 'adjust');
  const check = evals.find((e) => e.status === 'check');
  if (check) return `${check.label}는 확인이 필요해요`;
  if (adjust) return `${adjust.label}를 조정하면 더 맞아요`;
  return null;
}

export function JobCard({
  job,
  conditions,
  qualifications,
  ready = true,
}: {
  job: JobPosting;
  conditions: UserConditions;
  qualifications: UserQualifications;
  ready?: boolean;
}) {
  const navigate = useNavigate();
  const evals = ready ? evaluateConditions(conditions, job) : null;
  const quals = ready ? evaluateQualifications(qualifications, job) : [];
  const verdict = evals ? fitVerdict(evals) : null;
  const score = evals ? computeFitScore(evals) : 0;
  const qualFails = quals.filter((q) => q.status === 'x').length;
  const dim = verdict?.tone === 'adjust' && score < 55;
  const h = evals ? hint(evals) : null;

  return (
    <button
      className={`card ${dim ? 'card-dim' : ''}`}
      style={{ width: '100%', textAlign: 'left', display: 'block', opacity: dim ? 0.6 : 1 }}
      onClick={() => navigate(`/job/${job.id}`)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        {evals ? (
          <FitPercentBar score={score} />
        ) : (
          <span className="gcap">부합도 계산 불가 · 내 조건 등록 필요</span>
        )}
        {ready && (qualFails > 0 ? (
          <span className="pill adj">필수자격 {qualFails}개 미달</span>
        ) : quals.length > 0 ? (
          <span className="pill met">필수자격 충족</span>
        ) : null)}
      </div>
      <div className="co">{job.company}</div>
      <div className="ti">{job.title}</div>
      <div className="meta">
        <span>
          시급 <b>{job.wage.toLocaleString()}원</b>
        </span>
        <span>{job.timeSlot}</span>
        <span>도보 {job.walkMinutes}분</span>
      </div>
      {h && <p className="helper" style={{ marginTop: 8 }}>→ {h}</p>}
    </button>
  );
}
