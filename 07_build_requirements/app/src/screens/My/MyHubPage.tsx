import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseIcon, GearIcon } from '../../components/Icons';
import { UserIcon } from '../../components/NavIcons';
import { FitPercentBar } from '../../components/FitPercentBar';
import { JOBS } from '../../data/jobs';
import { computeFitScore, evaluateConditions } from '../../lib/fitScore';
import { onHorizontalWheel } from '../../lib/scroll';
import {
  hasSetConditions,
  useApplications,
  useResume,
  useUserConditions,
  useUserQualifications,
} from '../../state/hooks';

export function MyHubPage() {
  const navigate = useNavigate();
  const [conditions] = useUserConditions();
  const [qualifications] = useUserQualifications();
  const [resume] = useResume();
  const [applications] = useApplications();
  const [alertOn, setAlertOn] = useState(false);

  const conditionsDone = hasSetConditions(conditions);
  const qualDone = qualifications.age != null;

  const recommendedJobs = conditionsDone
    ? [...JOBS]
        .sort((a, b) => computeFitScore(evaluateConditions(conditions, b)) - computeFitScore(evaluateConditions(conditions, a)))
        .slice(0, 8)
    : [];

  return (
    <div className="screen">
      <div className="topbar" style={{ padding: '4px 0 12px', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>마이페이지</h1>
        <button className="my-close-btn" onClick={() => navigate('/')} aria-label="닫기">
          <CloseIcon />
        </button>
      </div>

      <div className="my-promo-banner">
        <div>
          <p className="ti" style={{ margin: 0, fontSize: 14 }}>지금 이용하면 좋아요</p>
          <p className="gcap" style={{ marginTop: 4 }}>조건을 등록하면 딱 맞는 공고를 바로 보여드려요</p>
        </div>
        <div className="my-promo-shape" />
      </div>

      <div className="my-profile-card">
        <span className="my-avatar">
          <UserIcon />
        </span>
        <div className="my-profile-text">
          <p className="ti" style={{ margin: 0 }}>회원님</p>
        </div>
        <button className="my-profile-edit" onClick={() => navigate('/my/conditions')}>
          <GearIcon />
          회원정보
        </button>
      </div>

      <div className="my-pill-row">
        <span className={`pill ${resume.selected ? 'met' : 'chk'}`}>{resume.selected ? '이력서 등록됨' : '이력서 미등록'}</span>
        <button className="pill chk" onClick={() => navigate('/my/resume')}>
          이력서 확인하기
        </button>
      </div>

      <div className="stats-row">
        <button className="stat-item" onClick={() => navigate('/my/resume')}>
          <span className="num">{resume.selected ? '1' : '0'}</span>
          <span className="label">이력서관리</span>
        </button>
        <div className="stat-item" style={{ cursor: 'default' }}>
          <span className="num">{applications.length}</span>
          <span className="label">지원현황</span>
        </div>
        <div className="stat-item" style={{ cursor: 'default' }}>
          <span className="num">0</span>
          <span className="label">스크랩</span>
        </div>
        <div className="stat-item" style={{ cursor: 'default' }}>
          <span className="num">0</span>
          <span className="label">최근 본 알바</span>
        </div>
      </div>

      <div className="stats-row secondary">
        <div className="stat-item" style={{ cursor: 'default' }}>
          <span className="num">0</span>
          <span className="label">알바제의</span>
        </div>
        <div className="stat-item" style={{ cursor: 'default' }}>
          <span className="num">0</span>
          <span className="label">이력서 열람</span>
        </div>
        <div className="stat-item" style={{ cursor: 'default' }}>
          <span className="num">0</span>
          <span className="label">관심기업</span>
        </div>
      </div>

      <button className={`my-toggle-banner ${alertOn ? 'on' : ''}`} onClick={() => setAlertOn((v) => !v)}>
        <span>
          <b>부합 알림</b> 설정하고 좋은 자리 놓치지 말자!
        </span>
        <span className="toggle-switch">
          <span className="toggle-knob" />
        </span>
      </button>

      <div className="hairline" />

      <p className="section-title">추천하는 알바</p>
      {recommendedJobs.length === 0 ? (
        <div className="empty-state" style={{ padding: '24px 12px' }}>
          <p className="d">내 조건을 등록하면 맞춤 추천을 보여드려요.</p>
        </div>
      ) : (
        <div className="home-carousel" style={{ marginBottom: 4 }}>
          <div className="home-carousel-track" onWheel={onHorizontalWheel}>
            {recommendedJobs.map((job) => {
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
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="hairline" />

      <p className="section-title">내 조건 관리</p>
      <MenuCard
        title="내 근무 조건"
        desc="시급 · 요일 · 시간대 · 거리 · 직종"
        done={conditionsDone}
        onClick={() => navigate('/my/conditions')}
      />
      <MenuCard
        title="경력 및 자격"
        desc="나이 · 경력 · 자격증 · 가능 시간"
        done={qualDone}
        onClick={() => navigate('/my/qualifications')}
      />
      <MenuCard
        title="내 이력서"
        desc={resume.selected ? `${resume.name} 사용 중` : '이력서를 선택해 주세요'}
        done={resume.selected}
        onClick={() => navigate('/my/resume')}
      />
    </div>
  );
}

function MenuCard({
  title,
  desc,
  done,
  onClick,
}: {
  title: string;
  desc: string;
  done: boolean;
  onClick: () => void;
}) {
  return (
    <button className="card" style={{ width: '100%', textAlign: 'left', display: 'block' }} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="ti" style={{ margin: 0 }}>
          {title}
        </span>
        <span className={`pill ${done ? 'met' : 'chk'}`}>{done ? '등록됨' : '미등록'}</span>
      </div>
      <p className="gcap" style={{ marginTop: 6 }}>
        {desc}
      </p>
    </button>
  );
}
