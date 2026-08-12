import { useNavigate, useParams } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { FitSummary } from '../../components/FitSummary';
import { QualificationList } from '../../components/QualificationList';
import { JOBS } from '../../data/jobs';
import { DAY_LABEL } from '../../data/types';
import { evaluateConditions, evaluateQualifications, qualificationsAllMet } from '../../lib/fitScore';
import { hasSetConditions, useUserConditions, useUserQualifications } from '../../state/hooks';

export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [conditions] = useUserConditions();
  const [qualifications] = useUserQualifications();

  const job = JOBS.find((j) => j.id === jobId);
  const ready = hasSetConditions(conditions);

  if (!job) {
    return (
      <div>
        <TopBar title="공고 상세" />
        <div className="screen empty-state">
          <p className="t">공고를 찾을 수 없어요</p>
        </div>
      </div>
    );
  }

  const evals = ready ? evaluateConditions(conditions, job) : null;
  const quals = ready ? evaluateQualifications(qualifications, job) : [];
  const eligible = ready ? qualificationsAllMet(quals) : true;

  return (
    <div>
      <TopBar title="공고 상세" />
      <div className="screen">
        <div className="co">{job.company}</div>
        <h2 style={{ fontSize: 18, fontWeight: 800, margin: '4px 0 12px' }}>{job.title}</h2>
        <div className="meta" style={{ marginBottom: 4 }}>
          <span>
            시급 <b>{job.wage.toLocaleString()}원</b>
          </span>
          <span>{job.days.map((d) => DAY_LABEL[d]).join(',')}</span>
          <span>{job.timeSlot}</span>
        </div>
        <p className="gcap" style={{ marginTop: 6 }}>
          {job.location} · 도보 {job.walkMinutes}분
        </p>

        <div className="hairline" />

        {/* FT-002 내 조건 부합도 */}
        <p className="section-title">내 조건 부합도</p>
        {!ready ? (
          <div className="card">
            <p className="ti" style={{ margin: 0, fontSize: 13.5 }}>내 조건을 등록하면 부합도를 알려드려요</p>
            <button className="btn ghost" style={{ marginTop: 12 }} onClick={() => navigate('/my/conditions')}>
              내 조건 등록하기
            </button>
          </div>
        ) : (
          <div className="card">
            <FitSummary evals={evals!} />
          </div>
        )}

        <div className="hairline" />

        {/* FT-003 필수 자격 확인 */}
        <p className="section-title">필수 자격 확인</p>
        <div className="card">
          {ready ? (
            <QualificationList items={quals} />
          ) : (
            <p className="gcap">내 조건(경력·자격)을 등록하면 O/X로 보여드려요.</p>
          )}
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 0, zIndex: 1, background: 'var(--bg)', padding: '10px 18px calc(14px + env(safe-area-inset-bottom))', borderTop: '1px solid var(--line)' }}>
        <div className="btn-row">
          <button className="btn ghost" onClick={() => navigate('/my/conditions')}>
            내 조건 조정
          </button>
          <button className="btn solid" disabled={ready && !eligible} onClick={() => navigate(`/apply/${job.id}`)}>
            지원하기
          </button>
        </div>
      </div>
    </div>
  );
}
