import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchResultCard } from '../../components/SearchResultCard';
import { XCircleIcon } from '../../components/Icons';
import { JOBS, JOB_TYPES } from '../../data/jobs';
import { computeFitScore, evaluateConditions, evaluateQualifications, qualificationsAllMet } from '../../lib/fitScore';
import { onHorizontalWheel } from '../../lib/scroll';
import { hasSetConditions, useUserConditions, useUserQualifications } from '../../state/hooks';

export function ExploreResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [conditions] = useUserConditions();
  const [qualifications] = useUserQualifications();
  const ready = hasSetConditions(conditions);

  const initialQuery = searchParams.get('q') ?? '';
  const [inputValue, setInputValue] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'fit' | 'recent'>('fit');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [noExperienceOnly, setNoExperienceOnly] = useState(false);

  const keyword = (searchParams.get('q') ?? '').toLowerCase();
  const jobTypes = searchParams.get('jobTypes')?.split(',').filter(Boolean) ?? [];
  const maxWalk = searchParams.get('maxWalk');

  const relatedTerms = JOB_TYPES.filter((jt) => jt.toLowerCase() !== keyword).slice(0, 6);

  const runSearch = (q: string) => {
    navigate(`/explore/results?q=${encodeURIComponent(q)}`);
  };

  const results = useMemo(() => {
    let list = JOBS.filter((job) => {
      if (keyword && !`${job.title} ${job.company} ${job.jobType}`.toLowerCase().includes(keyword)) return false;
      if (jobTypes.length && !jobTypes.includes(job.jobType)) return false;
      if (maxWalk && job.walkMinutes > Number(maxWalk)) return false;
      if (noExperienceOnly && job.required.minExperienceMonths > 0) return false;
      return true;
    });

    if (ready && onlyEligible) {
      list = list.filter((job) => qualificationsAllMet(evaluateQualifications(qualifications, job)));
    }

    if (ready) {
      list = [...list].sort((a, b) => {
        if (sortBy === 'fit') {
          return computeFitScore(evaluateConditions(conditions, b)) - computeFitScore(evaluateConditions(conditions, a));
        }
        return b.postedAt.localeCompare(a.postedAt);
      });
    } else {
      list = [...list].sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    }

    return list;
  }, [keyword, jobTypes, maxWalk, noExperienceOnly, ready, onlyEligible, sortBy, conditions, qualifications]);

  return (
    <div>
      <div className="search-fixed-header">
        <div className="search-topbar">
          <button className="back" onClick={() => navigate('/explore')} aria-label="뒤로가기">
            ‹
          </button>
          <input
            className="search-input"
            placeholder="어떤 알바를 찾으세요?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) runSearch(inputValue.trim());
            }}
          />
          {inputValue && (
            <button className="search-clear-btn" onClick={() => setInputValue('')} aria-label="지우기">
              <XCircleIcon />
            </button>
          )}
        </div>

        <div className="chip-scroll" onWheel={onHorizontalWheel}>
          <button className={`chip badge-chip ${noExperienceOnly ? 'active' : ''}`} onClick={() => setNoExperienceOnly((v) => !v)}>
            경력무관
          </button>
          {ready && (
            <button className={`chip badge-chip ${onlyEligible ? 'active' : ''}`} onClick={() => setOnlyEligible((v) => !v)}>
              필수자격 충족만
            </button>
          )}
        </div>
      </div>

      <div className="screen">
        {relatedTerms.length > 0 && (
          <div className="chip-scroll" style={{ marginBottom: 14 }} onWheel={onHorizontalWheel}>
            <span className="related-label">연관</span>
            {relatedTerms.map((term) => (
              <button key={term} className="chip" onClick={() => runSearch(term)}>
                {term}
              </button>
            ))}
          </div>
        )}

        {!ready && (
          <div className="card" style={{ marginBottom: 14 }}>
            <p className="ti" style={{ fontSize: 13.5, margin: 0 }}>내 조건을 등록하면 부합도가 보여요</p>
            <p className="gcap" style={{ margin: '6px 0 12px' }}>
              조건이 없어서 부합도를 계산할 수 없어요. 등록하면 딱 맞는 공고부터 보여드려요.
            </p>
            <button className="btn ghost" onClick={() => navigate('/my/conditions')}>
              내 조건 등록하기
            </button>
          </div>
        )}

        <div className="count-sort-row">
          <span className="gcap">{results.length}건</span>
          <button className="count-sort-toggle" onClick={() => setSortBy((s) => (s === 'fit' ? 'recent' : 'fit'))}>
            {sortBy === 'fit' ? '부합순' : '최신순'} ⌄
          </button>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">
            <p className="t">조건에 딱 맞는 알바를 찾지 못했어요</p>
            <p className="d">필터를 바꿔서 더 많은 알바를 확인해 보세요.</p>
            <button className="btn ghost" style={{ marginTop: 16 }} onClick={() => navigate('/explore')}>
              필터 바꾸기
            </button>
          </div>
        ) : (
          results.map((job) => (
            <SearchResultCard key={job.id} job={job} conditions={conditions} qualifications={qualifications} ready={ready} />
          ))
        )}
      </div>
    </div>
  );
}
