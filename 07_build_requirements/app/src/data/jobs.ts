import type { DayKey, JobPosting, TimeSlot } from './types';

export const JOB_TYPES = ['카페', '편의점', '음식점 홀', '물류·배송', '판매·매장', '사무보조'];

const CURATED_JOBS: JobPosting[] = [
  {
    id: 'j1',
    company: '뉴뉴 하우스 · 홍대점',
    title: '홍대점 카페 파트타임 채용',
    jobType: '카페',
    wage: 13200,
    days: ['sat', 'sun'],
    timeSlot: '오후',
    walkMinutes: 8,
    location: '서울 마포구 홍대',
    duration: '6개월~1년',
    required: { minAge: 18, minExperienceMonths: 0, requiredCertificate: null, requiresFullAvailability: false },
    preferred: ['카페 경력 우대'],
    postedAt: '2026-08-04',
  },
  {
    id: 'j2',
    company: '아워커버스 · 서교동',
    title: '여성의류 홍대 쇼룸 파트타이머',
    jobType: '판매·매장',
    wage: 12000,
    days: ['mon', 'tue', 'wed', 'thu', 'fri'],
    timeSlot: '협의',
    walkMinutes: 22,
    location: '서울 마포구 서교동',
    duration: '기간 협의',
    required: { minAge: 20, minExperienceMonths: 0, requiredCertificate: null, requiresFullAvailability: false },
    preferred: ['패션 판매 경력'],
    postedAt: '2026-08-03',
  },
  {
    id: 'j3',
    company: 'GS25 · 합정역점',
    title: '심야 편의점 근무자 모집',
    jobType: '편의점',
    wage: 12500,
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    timeSlot: '심야',
    walkMinutes: 5,
    location: '서울 마포구 합정동',
    duration: '1년 이상',
    required: { minAge: 19, minExperienceMonths: 0, requiredCertificate: null, requiresFullAvailability: false },
    preferred: [],
    postedAt: '2026-08-05',
  },
  {
    id: 'j4',
    company: '스시선생 · 연남점',
    title: '주말 홀 서빙 스태프',
    jobType: '음식점 홀',
    wage: 11500,
    days: ['sat', 'sun'],
    timeSlot: '저녁',
    walkMinutes: 12,
    location: '서울 마포구 연남동',
    duration: '3개월~6개월',
    required: { minAge: 18, minExperienceMonths: 3, requiredCertificate: '위생교육 이수증', requiresFullAvailability: false },
    preferred: ['서빙 경력 3개월 이상'],
    postedAt: '2026-08-02',
  },
  {
    id: 'j5',
    company: '쿠팡친구 · 상암캠프',
    title: '단기 물류 상하차 알바',
    jobType: '물류·배송',
    wage: 10800,
    days: ['mon', 'tue', 'wed', 'thu', 'fri'],
    timeSlot: '오전',
    walkMinutes: 40,
    location: '서울 마포구 상암동',
    duration: '1개월 이하',
    required: { minAge: 18, minExperienceMonths: 0, requiredCertificate: null, requiresFullAvailability: true },
    preferred: [],
    postedAt: '2026-08-01',
  },
  {
    id: 'j6',
    company: '오피스허브 · 공덕점',
    title: '사무보조 파트타이머',
    jobType: '사무보조',
    wage: 12000,
    days: ['mon', 'tue', 'wed', 'thu', 'fri'],
    timeSlot: '오후',
    walkMinutes: 15,
    location: '서울 마포구 공덕동',
    duration: '6개월~1년',
    required: { minAge: 20, minExperienceMonths: 6, requiredCertificate: '컴퓨터활용능력', requiresFullAvailability: false },
    preferred: ['엑셀 활용 가능자'],
    postedAt: '2026-08-05',
  },
  {
    id: 'j7',
    company: '카페 무드 · 망원점',
    title: '망원동 감성 카페 주말 바리스타',
    jobType: '카페',
    wage: 13000,
    days: ['sat', 'sun'],
    timeSlot: '오전',
    walkMinutes: 18,
    location: '서울 마포구 망원동',
    duration: '3개월~6개월',
    required: { minAge: 18, minExperienceMonths: 0, requiredCertificate: null, requiresFullAvailability: false },
    preferred: ['바리스타 자격증 우대'],
    postedAt: '2026-08-04',
  },
  {
    id: 'j8',
    company: 'CU · 망원역점',
    title: '평일 오후 편의점 근무',
    jobType: '편의점',
    wage: 11800,
    days: ['mon', 'tue', 'wed', 'thu', 'fri'],
    timeSlot: '오후',
    walkMinutes: 10,
    location: '서울 마포구 망원동',
    duration: '1년 이상',
    required: { minAge: 18, minExperienceMonths: 0, requiredCertificate: null, requiresFullAvailability: false },
    preferred: [],
    postedAt: '2026-08-05',
  },
];

const DISTRICTS = ['홍대', '합정', '망원', '연남', '상암', '공덕', '서교동', '신촌', '연희동', '성산동'];

const COMPANY_PREFIXES = ['해피', '스마일', '그린', '블루', '선샤인', '모던', '프레시', '굿모닝', '베스트', '로컬'];

const COMPANY_SUFFIXES: Record<string, string[]> = {
  '카페': ['커피', '카페', '로스터리'],
  '편의점': ['마트', '편의점', '스토어'],
  '음식점 홀': ['식당', '레스토랑', '다이닝'],
  '물류·배송': ['물류센터', '배송', '로지스틱스'],
  '판매·매장': ['샵', '스토어', '부티크'],
  '사무보조': ['오피스', '컴퍼니', '사무실'],
};

const TITLE_TEMPLATES: Record<string, string[]> = {
  '카페': ['{district} 카페 바리스타 모집', '{district}점 카페 파트타이머', '감성 카페 주말 스태프'],
  '편의점': ['{district}점 편의점 근무자', '심야 편의점 알바', '평일 오후 편의점 근무'],
  '음식점 홀': ['{district} 홀 서빙 스태프', '주방보조 겸 홀 알바', '맛집 홀서빙 모집'],
  '물류·배송': ['{district} 물류센터 상하차', '택배 분류 알바', '당일 배송 보조'],
  '판매·매장': ['{district} 매장 판매 알바', '시즌 세일즈 스태프', '팝업스토어 판매직'],
  '사무보조': ['{district} 사무보조 파트타이머', '문서정리 사무지원', '데이터입력 알바'],
};

const DAY_SETS: DayKey[][] = [
  ['sat', 'sun'],
  ['mon', 'tue', 'wed', 'thu', 'fri'],
  ['mon', 'wed', 'fri'],
  ['sat'],
  ['sun'],
  ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
];

const TIME_SLOTS: TimeSlot[] = ['오전', '오후', '저녁', '심야', '협의'];

const CERTS = ['위생교육 이수증', '컴퓨터활용능력', '바리스타 자격증'];

const DURATIONS = ['1개월 이하', '1개월~3개월', '3개월~6개월', '6개월~1년', '1년 이상', '기간 협의'];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateJobs(count: number): JobPosting[] {
  const rand = seededRandom(42);
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

  return Array.from({ length: count }, (_, i) => {
    const jobType = pick(JOB_TYPES);
    const district = pick(DISTRICTS);
    const company = `${pick(COMPANY_PREFIXES)}${pick(COMPANY_SUFFIXES[jobType])} · ${district}점`;
    const title = pick(TITLE_TEMPLATES[jobType]).replace('{district}', district);
    const day = 1 + Math.floor(rand() * 20);

    return {
      id: `g${i + 1}`,
      company,
      title,
      jobType,
      wage: 10000 + Math.floor(rand() * 9) * 500,
      days: pick(DAY_SETS),
      timeSlot: pick(TIME_SLOTS),
      walkMinutes: 3 + Math.floor(rand() * 30),
      location: `서울 마포구 ${district}`,
      duration: pick(DURATIONS),
      required: {
        minAge: pick([18, 19, 20, null]),
        minExperienceMonths: pick([0, 0, 0, 3, 6]),
        requiredCertificate: rand() < 0.15 ? pick(CERTS) : null,
        requiresFullAvailability: rand() < 0.1,
      },
      preferred: rand() < 0.5 ? [`${jobType} 경력 우대`] : [],
      postedAt: `2026-08-${String(day).padStart(2, '0')}`,
    };
  });
}

export const JOBS: JobPosting[] = [...CURATED_JOBS, ...generateJobs(42)];
