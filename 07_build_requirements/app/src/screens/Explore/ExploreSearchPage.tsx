import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JOB_TYPES } from '../../data/jobs';

export function ExploreSearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [maxWalk, setMaxWalk] = useState('');

  const toggleJobType = (jt: string) => {
    setJobTypes((prev) => (prev.includes(jt) ? prev.filter((v) => v !== jt) : [...prev, jt]));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (jobTypes.length) params.set('jobTypes', jobTypes.join(','));
    if (maxWalk) params.set('maxWalk', maxWalk);
    navigate(`/explore/results?${params.toString()}`);
  };

  return (
    <div className="screen">
      <div style={{ padding: '4px 0 12px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>알바 찾기</h1>
      </div>

      <div className="field">
        <label className="label">직종 · 지역 검색</label>
        <input
          className="input"
          placeholder="예: 카페, 홍대"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="field">
        <label className="label">직종</label>
        <div className="chip-select">
          {JOB_TYPES.map((jt) => (
            <button key={jt} className={jobTypes.includes(jt) ? 'selected' : ''} onClick={() => toggleJobType(jt)}>
              {jt}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label className="label">도보 이동 시간 (분, 선택)</label>
        <input
          className="input"
          type="number"
          inputMode="numeric"
          placeholder="예: 15"
          value={maxWalk}
          onChange={(e) => setMaxWalk(e.target.value)}
        />
      </div>

      <button className="btn solid" onClick={handleSearch}>
        검색하기
      </button>
    </div>
  );
}
