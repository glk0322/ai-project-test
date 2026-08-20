import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { useUserConditions } from '../../state/hooks';
import { JOB_TYPES } from '../../data/jobs';
import { DAY_LABEL, type DayKey, type TimeSlot } from '../../data/types';

const DAYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const TIME_SLOTS: TimeSlot[] = ['오전', '오후', '저녁', '심야'];

export function MyConditionsPage() {
  const navigate = useNavigate();
  const [conditions, setConditions] = useUserConditions();
  const [draft, setDraft] = useState(conditions);

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const canSave = draft.jobTypes.length > 0 && draft.minWage > 0 && draft.days.length > 0 && draft.timeSlots.length > 0 && draft.maxWalkMinutes > 0;

  const handleSave = () => {
    setConditions(draft);
    navigate('/my');
  };

  return (
    <div>
      <TopBar title="내 근무 조건" />
      <div className="screen" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>
        <div className="field">
          <label className="label">희망 직종 (복수 선택 가능)</label>
          <div className="chip-select">
            {JOB_TYPES.map((jt) => (
              <button
                key={jt}
                className={draft.jobTypes.includes(jt) ? 'selected' : ''}
                onClick={() => setDraft((d) => ({ ...d, jobTypes: toggle(d.jobTypes, jt) }))}
              >
                {jt}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label">희망 시급 (최소)</label>
          <input
            className="input"
            type="number"
            inputMode="numeric"
            placeholder="예: 12000"
            value={draft.minWage || ''}
            onChange={(e) => setDraft((d) => ({ ...d, minWage: Number(e.target.value) }))}
          />
          <p className="helper">이 시급 이상인 공고를 '충족'으로 판단해요.</p>
        </div>

        <div className="field">
          <label className="label">근무 가능 요일</label>
          <div className="chip-select">
            {DAYS.map((d) => (
              <button
                key={d}
                className={draft.days.includes(d) ? 'selected' : ''}
                onClick={() => setDraft((prev) => ({ ...prev, days: toggle(prev.days, d) }))}
              >
                {DAY_LABEL[d]}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label">근무 가능 시간대</label>
          <div className="chip-select">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                className={draft.timeSlots.includes(t) ? 'selected' : ''}
                onClick={() => setDraft((prev) => ({ ...prev, timeSlots: toggle(prev.timeSlots, t) }))}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label">이동 가능 거리 (도보 분)</label>
          <input
            className="input"
            type="number"
            inputMode="numeric"
            placeholder="예: 15"
            value={draft.maxWalkMinutes || ''}
            onChange={(e) => setDraft((d) => ({ ...d, maxWalkMinutes: Number(e.target.value) }))}
          />
          <p className="helper">도보 기준 이동 가능한 최대 시간이에요.</p>
        </div>

        <button className="btn solid" disabled={!canSave} onClick={handleSave}>
          저장하기
        </button>
      </div>
    </div>
  );
}
