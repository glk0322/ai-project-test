import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { FitSummary } from '../../components/FitSummary';
import { QualificationList } from '../../components/QualificationList';
import { BuildingIcon, GradCapIcon, PaperIcon, StarIcon } from '../../components/JobBadgeIcons';
import { JOBS } from '../../data/jobs';
import { DAY_LABEL } from '../../data/types';
import { evaluateConditions, evaluateQualifications, qualificationsAllMet } from '../../lib/fitScore';
import { hasSetConditions, useUserConditions, useUserQualifications } from '../../state/hooks';

function hashStr(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

// Rating/review count/verification badges are display-only placeholders (no such data exists yet) — deterministic per job so they don't shift on re-render.
function jobDisplayExtras(jobId: string) {
  const rating = (hashStr(`${jobId}:rating`) % 4) + 2;
  const reviewCount = (hashStr(`${jobId}:reviews`) % 47) + 3;
  const badges = [
    hashStr(`${jobId}:badge0`) % 2 === 0,
    hashStr(`${jobId}:badge1`) % 2 === 0,
    hashStr(`${jobId}:badge2`) % 2 === 0,
  ];
  if (!badges.some(Boolean)) badges[0] = true;
  return { rating, reviewCount, badges };
}

export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [conditions] = useUserConditions();
  const [qualifications] = useUserQualifications();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [showTitleInHeader, setShowTitleInHeader] = useState(false);

  const job = JOBS.find((j) => j.id === jobId);

  useEffect(() => {
    setShowTitleInHeader(false);
    const titleEl = titleRef.current;
    if (!job || !titleEl) return;
    const scrollRoot = titleEl.closest('.app-content');
    const headerHeight = scrollRoot?.querySelector('.topbar')?.getBoundingClientRect().height ?? 56;
    const observer = new IntersectionObserver(([entry]) => setShowTitleInHeader(!entry.isIntersecting), {
      root: scrollRoot,
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
      threshold: 0,
    });
    observer.observe(titleEl);
    return () => observer.disconnect();
  }, [job]);

  if (!job) {
    return (
      <div>
        <TopBar title="채용정보" />
        <div className="screen empty-state">
          <p className="t">공고를 찾을 수 없어요</p>
        </div>
      </div>
    );
  }

  const ready = hasSetConditions(conditions);
  const evals = ready ? evaluateConditions(conditions, job) : null;
  const quals = ready ? evaluateQualifications(qualifications, job) : [];
  const eligible = ready ? qualificationsAllMet(quals) : true;
  const timeLabel = job.timeSlot === '협의' ? '시간 협의' : job.timeSlot;
  const { rating, reviewCount, badges } = jobDisplayExtras(job.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <TopBar title={showTitleInHeader ? job.title : '채용정보'} />
      <div className="screen" style={{ flex: 1 }}>
        <div className="job-detail-postedat-row">
          <span className="job-detail-postedat">{job.postedAt}</span>
        </div>
        <h2 ref={titleRef} className="job-detail-title">
          {job.title}
        </h2>
        <div className="job-detail-company-row">
          <div className="job-detail-avatar" />
          <div className="job-detail-company-info">
            <div className="co">{job.company}</div>
            <div className="job-detail-rating">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} filled={i < rating} />
              ))}
              <span className="job-detail-rating-num">{rating}</span>
              <span className="job-detail-rating-count">({reviewCount})</span>
            </div>
          </div>
        </div>
        <div className="job-detail-badges">
          {badges[0] && (
            <span className="job-detail-badge badge-verified">
              <BuildingIcon />
              기업인증
            </span>
          )}
          {badges[1] && (
            <span className="job-detail-badge badge-contract">
              <PaperIcon />
              근로계약서약속
            </span>
          )}
          {badges[2] && (
            <span className="job-detail-badge badge-education">
              <GradCapIcon />
              성희롱예방교육수료
            </span>
          )}
        </div>

        <div className="hairline" />

        {/* FT-002 내 조건 부합도 */}
        <p className="section-title" style={{ fontSize: 16, fontWeight: 'bold' }}>내 조건 부합도</p>
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
        <p className="section-title" style={{ fontSize: 16, fontWeight: 'bold' }}>필수 자격 확인</p>
        <div className="card" style={{ paddingTop: 0, paddingBottom: 0 }}>
          {ready ? (
            <QualificationList items={quals} />
          ) : (
            <p className="gcap">내 조건(경력·자격)을 등록하면 O/X로 보여드려요.</p>
          )}
        </div>

        <div className="hairline" />

        <p className="section-title" style={{ fontSize: 16, fontWeight: 'bold' }}>근무조건</p>
        <div className="job-info-rows">
          <div className="job-info-row">
            <span className="label">급여</span>
            <span className="value">
              <span className="wage-line">
                <span className="pill met">시급</span>
                {job.wage.toLocaleString()}원
              </span>
              {job.preferred.length > 0 && <span className="sub-line">{job.preferred.join(', ')}</span>}
            </span>
          </div>
          <div className="job-info-row">
            <span className="label">근무기간</span>
            <span className="value">{job.duration}</span>
          </div>
          <div className="job-info-row">
            <span className="label">근무요일</span>
            <span className="value">{job.days.map((d) => DAY_LABEL[d]).join(', ')}</span>
          </div>
          <div className="job-info-row">
            <span className="label">근무시간</span>
            <span className="value">{timeLabel}</span>
          </div>
          <div className="job-info-row">
            <span className="label">근무지</span>
            <span className="value">
              {job.location} · 도보 {job.walkMinutes}분
            </span>
          </div>
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
