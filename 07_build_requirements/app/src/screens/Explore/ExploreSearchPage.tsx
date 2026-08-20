import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onHorizontalWheel } from '../../lib/scroll';
import { useRecentSearches } from '../../state/hooks';

const POPULAR_SEARCHES = ['카페', '편의점', '음식점 홀', '물류·배송', '판매·매장', '사무보조', '주말', '심야'];

export function ExploreSearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [recent, setRecent] = useRecentSearches();

  const runSearch = (term: string) => {
    const q = term.trim();
    if (!q) return;
    setRecent((prev) => [q, ...prev.filter((r) => r !== q)].slice(0, 8));
    navigate(`/explore/results?q=${encodeURIComponent(q)}`);
  };

  return (
    <div>
      <div className="search-topbar">
        <button className="back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          ‹
        </button>
        <input
          className="search-input"
          autoFocus
          placeholder="어떤 알바를 찾으세요?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') runSearch(keyword);
          }}
        />
      </div>
      <div className="hairline" style={{ margin: 0 }} />

      <div className="screen" style={{ paddingTop: 18, paddingBottom: 'calc(32px + env(safe-area-inset-bottom))' }}>
        {recent.length > 0 && (
          <div className="field">
            <label className="label">최근 검색어</label>
            <div className="chip-scroll" onWheel={onHorizontalWheel}>
              {recent.map((term) => (
                <span key={term} className="chip-removable">
                  <button className="term" onClick={() => runSearch(term)}>
                    {term}
                  </button>
                  <button
                    className="remove"
                    aria-label={`${term} 삭제`}
                    onClick={() => setRecent((prev) => prev.filter((r) => r !== term))}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="field">
          <label className="label">인기 검색어</label>
          <div className="chip-select">
            {POPULAR_SEARCHES.map((term) => (
              <button key={term} onClick={() => runSearch(term)}>
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
