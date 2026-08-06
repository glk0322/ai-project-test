import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { FitGauge } from '../../components/FitGauge';
import { QualificationList } from '../../components/QualificationList';
import { BottomSheet } from '../../components/BottomSheet';
import { JOBS } from '../../data/jobs';
import { DAY_LABEL } from '../../data/types';
import {
  computeFitScore,
  evaluateConditions,
  evaluateQualifications,
  fitVerdict,
  qualificationsAllMet,
} from '../../lib/fitScore';
import { hasSetConditions, useUserConditions, useUserQualifications } from '../../state/hooks';

function headline(tone: 'met' | 'check' | 'adjust'): string {
  if (tone === 'met') return '지금 지원해도 될 것 같아요';
  if (tone === 'check') return '확인이 필요해요';
  return '지금은 애매해요';
}

export function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [conditions] = useUserConditions();
  const [qualifications] = useUserQualifications();
  const [sheetOpen, setSheetOpen] = useState(false);

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
  const verdict = evals ? fitVerdict(evals) : null;
  const score = evals ? computeFitScore(evals) : null;
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
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 30, fontWeight: 800 }}>{score}%</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sub)' }}>{headline(verdict!.tone)}</span>
            </div>
            <p className="gcap" style={{ marginBottom: 14 }}>
              {evals!.map((e) => `${e.label} ${e.status === 'met' ? '충족' : e.status === 'check' ? '확인 필요' : '조정 필요'}`).join(' · ')}
            </p>
            <button className="btn ghost" onClick={() => setSheetOpen(true)}>
              부합도 자세히 보기
            </button>
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

      {sheetOpen && evals && (
        <BottomSheet
          onClose={() => setSheetOpen(false)}
          title="부합도 자세히 보기"
          lead="항목별로 어디가 맞고, 어디를 조정하면 되는지 보여드려요."
        >
          <FitGauge evals={evals} />
        </BottomSheet>
      )}
    </div>
  );
}
