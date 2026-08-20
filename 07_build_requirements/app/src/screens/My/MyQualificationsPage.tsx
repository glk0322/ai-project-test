import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { useUserQualifications } from '../../state/hooks';

const COMMON_CERTS = ['위생교육 이수증', '컴퓨터활용능력', '바리스타 자격증', '운전면허'];

export function MyQualificationsPage() {
  const navigate = useNavigate();
  const [qualifications, setQualifications] = useUserQualifications();
  const [draft, setDraft] = useState(qualifications);

  const toggleCert = (cert: string) => {
    setDraft((d) => ({
      ...d,
      certificates: d.certificates.includes(cert)
        ? d.certificates.filter((c) => c !== cert)
        : [...d.certificates, cert],
    }));
  };

  const canSave = draft.age != null && draft.age > 0;

  const handleSave = () => {
    setQualifications(draft);
    navigate('/my');
  };

  return (
    <div>
      <TopBar title="경력 및 자격" />
      <div className="screen" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>
        <p className="gcap" style={{ marginBottom: 18 }}>
          공고의 필수 자격(나이·경력·자격증·가능 시간) 충족 여부를 O/X로 보여주는 데 사용돼요.
        </p>

        <div className="field">
          <label className="label">나이</label>
          <input
            className="input"
            type="number"
            inputMode="numeric"
            placeholder="예: 22"
            value={draft.age ?? ''}
            onChange={(e) => setDraft((d) => ({ ...d, age: e.target.value ? Number(e.target.value) : null }))}
          />
        </div>

        <div className="field">
          <label className="label">관련 경력 (개월)</label>
          <input
            className="input"
            type="number"
            inputMode="numeric"
            placeholder="예: 6"
            value={draft.experienceMonths ?? ''}
            onChange={(e) => setDraft((d) => ({ ...d, experienceMonths: Number(e.target.value) }))}
          />
          <p className="helper">경력이 없으면 0으로 두세요.</p>
        </div>

        <div className="field">
          <label className="label">보유 자격증</label>
          <div className="chip-select">
            {COMMON_CERTS.map((cert) => (
              <button
                key={cert}
                className={draft.certificates.includes(cert) ? 'selected' : ''}
                onClick={() => toggleCert(cert)}
              >
                {cert}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label">상시 근무 가능 여부</label>
          <div className="chip-select">
            <button
              className={draft.availableAnytime ? 'selected' : ''}
              onClick={() => setDraft((d) => ({ ...d, availableAnytime: true }))}
            >
              언제든 가능
            </button>
            <button
              className={!draft.availableAnytime ? 'selected' : ''}
              onClick={() => setDraft((d) => ({ ...d, availableAnytime: false }))}
            >
              일부만 가능
            </button>
          </div>
          <p className="helper">'상시 근무자 우대·필수' 공고의 O/X 판정에 쓰여요.</p>
        </div>

        <button className="btn solid" disabled={!canSave} onClick={handleSave}>
          저장하기
        </button>
      </div>
    </div>
  );
}
