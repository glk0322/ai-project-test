import { useNavigate } from 'react-router-dom';
import { useResume, useUserConditions, useUserQualifications } from '../../state/hooks';
import { hasSetConditions } from '../../state/hooks';

export function MyHubPage() {
  const navigate = useNavigate();
  const [conditions] = useUserConditions();
  const [qualifications] = useUserQualifications();
  const [resume] = useResume();

  const conditionsDone = hasSetConditions(conditions);
  const qualDone = qualifications.age != null;

  return (
    <div className="screen">
      <div className="topbar" style={{ padding: '4px 0 8px' }}>
        <h1 style={{ fontSize: 20 }}>내 조건</h1>
      </div>
      <p className="gcap" style={{ marginBottom: 18 }}>
        여기 등록한 값으로 모든 공고의 부합도(%)와 필수 자격 O/X를 계산해요.
      </p>

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
