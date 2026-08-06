import { useNavigate } from 'react-router-dom';
import { JOBS } from '../../data/jobs';
import { JobCard } from '../../components/JobCard';
import { computeFitScore, evaluateConditions } from '../../lib/fitScore';
import { hasSetConditions, useUserConditions, useUserQualifications } from '../../state/hooks';
import { DAY_LABEL } from '../../data/types';

export function HomePage() {
  const navigate = useNavigate();
  const [conditions] = useUserConditions();
  const [qualifications] = useUserQualifications();
  const ready = hasSetConditions(conditions);

  const sorted = ready
    ? [...JOBS].sort(
        (a, b) => computeFitScore(evaluateConditions(conditions, b)) - computeFitScore(evaluateConditions(conditions, a)),
      )
    : [];

  return (
    <div className="screen">
      <div style={{ padding: '4px 0 12px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>내 조건에 맞는 알바</h1>
      </div>

      {!ready ? (
        <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
          <p className="ti" style={{ fontSize: 15 }}>내 조건을 등록해주세요</p>
          <p className="gcap" style={{ margin: '6px 0 18px', lineHeight: 1.6 }}>
            조건이 없으면 부합도를 계산할 수 없어요. 시급 · 요일 · 시간대 · 거리를 등록하면 딱 맞는 알바를 바로 보여드릴게요.
          </p>
          <button className="btn solid" onClick={() => navigate('/my/conditions')}>
            내 조건 등록하기
          </button>
        </div>
      ) : (
        <>
          <button className="card" style={{ width: '100%', textAlign: 'left', display: 'block', marginBottom: 16 }} onClick={() => navigate('/my/conditions')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="ti" style={{ margin: 0, fontSize: 13 }}>내 조건 요약</span>
              <span className="gcap">수정 ›</span>
            </div>
            <p className="gcap" style={{ marginTop: 8 }}>
              시급 {conditions.minWage.toLocaleString()}원+ · {conditions.days.map((d) => DAY_LABEL[d]).join(',')} ·
              도보 {conditions.maxWalkMinutes}분 이내
            </p>
          </button>

          <p className="section-title">부합도 높은 순</p>
          {sorted.map((job) => (
            <JobCard key={job.id} job={job} conditions={conditions} qualifications={qualifications} />
          ))}
        </>
      )}
    </div>
  );
}
