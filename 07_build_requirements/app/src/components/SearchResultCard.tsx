import { useNavigate } from 'react-router-dom';
import type { JobPosting, UserConditions, UserQualifications } from '../data/types';
import { evaluateConditions, evaluateQualifications, computeFitScore } from '../lib/fitScore';
import { FitPercentBar } from './FitPercentBar';
import { StarIcon } from './Icons';

function relativeDate(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days <= 0) return '오늘';
  return `${days}일 전`;
}

export function SearchResultCard({
  job,
  conditions,
  qualifications,
  ready,
}: {
  job: JobPosting;
  conditions: UserConditions;
  qualifications: UserQualifications;
  ready: boolean;
}) {
  const navigate = useNavigate();
  const evals = ready ? evaluateConditions(conditions, job) : null;
  const quals = ready ? evaluateQualifications(qualifications, job) : [];
  const score = evals ? computeFitScore(evals) : 0;
  const qualFails = quals.filter((q) => q.status === 'x').length;
  const timeLabel = job.timeSlot === '협의' ? '시간 협의' : job.timeSlot;

  return (
    <div className="result-card" onClick={() => navigate(`/job/${job.id}`)}>
      <div className="result-top">
        <span className="co">{job.company}</span>
        <span className="result-meta-right">
          {relativeDate(job.postedAt)}
          <StarIcon className="result-star" />
        </span>
      </div>
      <div className="ti">{job.title}</div>
      <div className="meta">
        <span>{timeLabel}</span>
        <span>{job.duration}</span>
      </div>

      <div className="tag-row">
        <span className="tag-chip">{job.jobType}</span>
      </div>

      {ready && evals && (
        <div className="result-fit-row">
          <FitPercentBar score={score} />
          {qualFails > 0 ? (
            <span className="pill adj">필수자격 {qualFails}개 미달</span>
          ) : (
            <span className="pill met">필수자격 충족</span>
          )}
        </div>
      )}

      <div className="hairline" style={{ margin: '10px 0' }} />

      <div className="result-footer">
        <span className="gcap">
          {job.location} · <b>{job.wage.toLocaleString()}원</b>
        </span>
        <button
          className="btn-pill-sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/job/${job.id}`);
          }}
        >
          지원하기
        </button>
      </div>
    </div>
  );
}
