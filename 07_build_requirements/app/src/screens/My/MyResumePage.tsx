import { TopBar } from '../../components/TopBar';
import { useResume } from '../../state/hooks';

export function MyResumePage() {
  const [resume, setResume] = useResume();

  return (
    <div>
      <TopBar title="내 이력서" />
      <div className="screen">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="ti" style={{ margin: 0 }}>
              {resume.name}
            </span>
            <button
              className={`pill ${resume.selected ? 'met' : 'chk'}`}
              onClick={() => setResume((r) => ({ ...r, selected: !r.selected }))}
            >
              {resume.selected ? '지원에 사용 중' : '사용 안 함'}
            </button>
          </div>
          <p className="gcap" style={{ marginTop: 10, lineHeight: 1.6 }}>
            {resume.summary}
          </p>
        </div>

        <div className="hairline" />

        <button className="btn ghost" disabled>
          이력서 수정 (수정은 MVP2)
        </button>
        <p className="helper" style={{ marginTop: 10 }}>
          지금은 기본 이력서 그대로 지원에 사용돼요. 수정 기능은 다음 버전에서 제공될 예정이에요.
        </p>
      </div>
    </div>
  );
}
