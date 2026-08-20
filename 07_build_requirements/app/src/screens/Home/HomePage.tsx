import type { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { JOBS, JOB_TYPES } from '../../data/jobs';
import { JobCard } from '../../components/JobCard';
import { FitPercentBar } from '../../components/FitPercentBar';
import { BagIcon, BoxIcon, ChevronDownIcon, CupIcon, DeskIcon, PinIcon, PlateIcon, SearchIcon, StoreIcon } from '../../components/Icons';
import { computeFitScore, evaluateConditions } from '../../lib/fitScore';
import { onHorizontalWheel } from '../../lib/scroll';
import { hasSetConditions, useUserConditions, useUserQualifications } from '../../state/hooks';
import { DAY_LABEL } from '../../data/types';

const JOB_TYPE_ICON: Record<string, ComponentType> = {
  '카페': CupIcon,
  '편의점': StoreIcon,
  '음식점 홀': PlateIcon,
  '물류·배송': BoxIcon,
  '판매·매장': BagIcon,
  '사무보조': DeskIcon,
};

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
  const top3 = sorted.slice(0, 3);

  return (
    <div className="screen" style={{ paddingTop: 12 }}>
      <div className="home-topbar">
        <button className="home-location" onClick={() => navigate('/my/conditions')}>
          <PinIcon />
          {ready ? `도보 ${conditions.maxWalkMinutes}분 이내` : '내 지역'}
          <ChevronDownIcon />
        </button>
        <button className="home-icon-btn" onClick={() => navigate('/explore')} aria-label="검색">
          <SearchIcon />
        </button>
      </div>

      {!ready ? (
        <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
          <p className="ti" style={{ fontSize: 15 }}>내 조건을 등록해주세요</p>
          <p className="gcap" style={{ margin: '6px 0 18px', lineHeight: 1.6, fontSize: 12 }}>
            조건이 없으면 부합도를 계산할 수 없어요. 시급 · 요일 · 시간대 · 거리를 등록하면 딱 맞는 알바를 바로 보여드릴게요.
          </p>
          <button className="btn solid" onClick={() => navigate('/my/conditions')}>
            내 조건 등록하기
          </button>
        </div>
      ) : (
        <>
          <div className="home-banner">
            내 조건 기준으로 <b>딱 맞는 알바</b>만 모았어요!
          </div>

          <div className="home-carousel">
            <div className="home-carousel-track" onWheel={onHorizontalWheel}>
              {top3.map((job) => {
                const evals = evaluateConditions(conditions, job);
                const score = computeFitScore(evals);
                return (
                  <button key={job.id} className="home-carousel-card" onClick={() => navigate(`/job/${job.id}`)}>
                    <FitPercentBar score={score} />
                    <div className="co" style={{ marginTop: 8 }}>{job.company}</div>
                    <div className="ti" style={{ fontSize: 13.5 }}>{job.title}</div>
                    <div className="meta">
                      <span>
                        시급 <b>{job.wage.toLocaleString()}원</b>
                      </span>
                      <span>{job.timeSlot}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="home-carousel-dots">
              {top3.map((job, i) => (
                <span key={job.id} className={i === 0 ? 'active' : ''} />
              ))}
            </div>
          </div>

          <div className="home-quick-row" onWheel={onHorizontalWheel}>
            {JOB_TYPES.map((jt) => {
              const Icon = JOB_TYPE_ICON[jt];
              return (
                <button key={jt} className="home-quick-item" onClick={() => navigate(`/explore/results?jobTypes=${encodeURIComponent(jt)}`)}>
                  <span className="home-quick-icon">
                    <Icon />
                  </span>
                  <span>{jt}</span>
                </button>
              );
            })}
          </div>

          <div className="home-filter-row" onWheel={onHorizontalWheel}>
            <span className="home-filter-chip">시급 {conditions.minWage.toLocaleString()}원+</span>
            <span className="home-filter-chip">{conditions.days.map((d) => DAY_LABEL[d]).join(',')}</span>
            <span className="home-filter-chip">{conditions.timeSlots.join(',')}</span>
            <span className="home-filter-chip">도보 {conditions.maxWalkMinutes}분</span>
            <button className="home-filter-chip edit" onClick={() => navigate('/my/conditions')}>
              조건 수정
            </button>
          </div>

          <p className="section-title">부합도 높은 순</p>
          {sorted.map((job) => (
            <JobCard key={job.id} job={job} conditions={conditions} qualifications={qualifications} />
          ))}
        </>
      )}
    </div>
  );
}
