import { useNavigate, useParams } from 'react-router-dom';
import { JobCard } from '../../components/JobCard';
import { JOBS } from '../../data/jobs';
import { qualificationsAllMet, evaluateQualifications, computeFitScore, evaluateConditions } from '../../lib/fitScore';
import { hasSetConditions, useApplications, useUserConditions, useUserQualifications } from '../../state/hooks';

export function ApplyCompletePage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications] = useApplications();
  const [conditions] = useUserConditions();
  const [qualifications] = useUserQualifications();
  const ready = hasSetConditions(conditions);

  const appliedIds = new Set(applications.map((a) => a.jobId));
  const job = JOBS.find((j) => j.id === jobId);

  let similar = JOBS.filter((j) => j.id !== jobId && !appliedIds.has(j.id) && (!job || j.jobType === job.jobType));
  if (similar.length === 0) {
    similar = JOBS.filter((j) => j.id !== jobId && !appliedIds.has(j.id));
  }
  if (ready) {
    similar = similar.filter((j) => qualificationsAllMet(evaluateQualifications(qualifications, j)));
    similar = [...similar].sort(
      (a, b) => computeFitScore(evaluateConditions(conditions, b)) - computeFitScore(evaluateConditions(conditions, a)),
    );
  }
  similar = similar.slice(0, 3);

  return (
    <div>
      <div className="screen" style={{ paddingTop: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--orange-soft)',
              color: 'var(--orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 800,
              margin: '0 auto 16px',
            }}
          >
            ✓
          </div>
          <p style={{ fontSize: 18, fontWeight: 800 }}>총 {applications.length}건 지원 완료했습니다.</p>
          <p className="gcap" style={{ marginTop: 6 }}>지원 결과는 알림으로 알려드릴게요.</p>
        </div>

        {similar.length > 0 && (
          <>
            <div className="hairline" />
            <p className="section-title">함께 지원 가능한 알바가 {similar.length}개 있어요!</p>
            {similar.map((j) => (
              <JobCard key={j.id} job={j} conditions={conditions} qualifications={qualifications} ready={ready} />
            ))}
          </>
        )}
      </div>

      <div className="btn-row" style={{ padding: '10px 18px calc(14px + env(safe-area-inset-bottom))' }}>
        <button className="btn ghost" onClick={() => navigate('/explore')}>
          더 둘러보기
        </button>
        <button className="btn solid" onClick={() => navigate('/')}>
          홈으로
        </button>
      </div>
    </div>
  );
}
