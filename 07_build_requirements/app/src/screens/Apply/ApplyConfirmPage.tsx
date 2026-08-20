import { useNavigate, useParams } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { JOBS } from '../../data/jobs';
import { DAY_LABEL } from '../../data/types';
import { useApplications, useResume } from '../../state/hooks';

export function ApplyConfirmPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [resume] = useResume();
  const [applications, setApplications] = useApplications();

  const job = JOBS.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div>
        <TopBar title="지원 내용 확인" />
        <div className="screen empty-state">
          <p className="t">공고를 찾을 수 없어요</p>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    setApplications([...applications, { jobId: job.id, appliedAt: new Date().toISOString() }]);
    navigate(`/apply/${job.id}/complete`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <TopBar title="지원 내용 확인" />
      <div className="screen" style={{ flex: 1 }}>
        <p className="section-title">지원 공고</p>
        <div className="card">
          <div className="co">{job.company}</div>
          <div className="ti">{job.title}</div>
          <div className="meta">
            <span>
              시급 <b>{job.wage.toLocaleString()}원</b>
            </span>
            <span>{job.days.map((d) => DAY_LABEL[d]).join(',')}</span>
            <span>{job.timeSlot}</span>
          </div>
        </div>

        <p className="section-title" style={{ marginTop: 20 }}>제출 이력서</p>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="ti" style={{ margin: 0 }}>{resume.name}</span>
            <span className="gcap">기본 이력서 그대로 제출</span>
          </div>
          <p className="gcap" style={{ marginTop: 8, lineHeight: 1.6 }}>{resume.summary}</p>
        </div>

        <p className="helper" style={{ marginTop: 16 }}>
          제출 후에는 지원 내용을 수정할 수 없어요. 내용을 확인한 뒤 제출해 주세요.
        </p>
      </div>

      <div
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
          background: 'var(--bg)',
          padding: '10px 18px calc(14px + env(safe-area-inset-bottom))',
          borderTop: '1px solid var(--line)',
        }}
      >
        <button className="btn solid" onClick={handleSubmit}>
          지원하기
        </button>
      </div>
    </div>
  );
}
