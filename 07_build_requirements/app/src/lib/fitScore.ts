import type { JobPosting, UserConditions, UserQualifications } from '../data/types';

export type ConditionStatus = 'met' | 'check' | 'adjust';

export interface ConditionEval {
  key: 'wage' | 'schedule' | 'distance';
  label: string;
  status: ConditionStatus;
  gcap: string;
  fillPercent: number;
  tickPercent: number;
  dashed?: boolean;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function evalWage(user: UserConditions, job: JobPosting): ConditionEval {
  const met = job.wage >= user.minWage;
  const scaleMax = Math.max(user.minWage * 1.4, job.wage * 1.05);
  const diff = job.wage - user.minWage;
  return {
    key: 'wage',
    label: '시급',
    status: met ? 'met' : 'adjust',
    gcap: `내 기준 ${user.minWage.toLocaleString()}원 · 공고 ${job.wage.toLocaleString()}원 (${
      diff >= 0 ? '+' : ''
    }${diff.toLocaleString()})`,
    fillPercent: clamp((job.wage / scaleMax) * 100, 8, 100),
    tickPercent: clamp((user.minWage / scaleMax) * 100, 8, 100),
  };
}

function evalSchedule(user: UserConditions, job: JobPosting): ConditionEval {
  const daysOverlap = job.days.some((d) => user.days.includes(d));
  if (job.timeSlot === '협의') {
    return {
      key: 'schedule',
      label: '요일 · 시간대',
      status: 'check',
      gcap: `요일은 ${daysOverlap ? '겹쳐요' : '다를 수 있어요'} · 시간대는 사장님과 협의가 필요해요`,
      fillPercent: 0,
      tickPercent: 0,
      dashed: true,
    };
  }
  const timeOk = user.timeSlots.includes(job.timeSlot);
  const met = daysOverlap && timeOk;
  return {
    key: 'schedule',
    label: '요일 · 시간대',
    status: met ? 'met' : 'adjust',
    gcap: met
      ? `내 조건과 요일 · 시간대가 겹쳐요`
      : !daysOverlap
        ? '근무 요일이 내 가능 요일과 겹치지 않아요'
        : `공고 시간대(${job.timeSlot})가 내 가능 시간대와 달라요`,
    fillPercent: met ? 100 : 45,
    tickPercent: 50,
  };
}

function evalDistance(user: UserConditions, job: JobPosting): ConditionEval {
  const met = job.walkMinutes <= user.maxWalkMinutes;
  const scaleMax = Math.max(user.maxWalkMinutes * 1.6, job.walkMinutes * 1.1, 10);
  const gap = job.walkMinutes - user.maxWalkMinutes;
  return {
    key: 'distance',
    label: '거리',
    status: met ? 'met' : 'adjust',
    gcap: `내 기준 도보 ${user.maxWalkMinutes}분 · 공고 도보 ${job.walkMinutes}분${
      gap > 0 ? ` (+${gap}분)` : ''
    }`,
    fillPercent: clamp((job.walkMinutes / scaleMax) * 100, 8, 100),
    tickPercent: clamp((user.maxWalkMinutes / scaleMax) * 100, 8, 100),
  };
}

export function evaluateConditions(user: UserConditions, job: JobPosting): ConditionEval[] {
  return [evalWage(user, job), evalSchedule(user, job), evalDistance(user, job)];
}

const STATUS_SCORE: Record<ConditionStatus, number> = { met: 100, check: 55, adjust: 38 };

export function computeFitScore(evals: ConditionEval[]): number {
  const total = evals.reduce((sum, e) => sum + STATUS_SCORE[e.status], 0);
  return Math.round(total / evals.length);
}

export function fitVerdict(evals: ConditionEval[]): { label: string; tone: 'met' | 'check' | 'adjust' } {
  const metCount = evals.filter((e) => e.status === 'met').length;
  const hasCheck = evals.some((e) => e.status === 'check');
  if (metCount === evals.length) return { label: `맞음 · ${metCount}/${evals.length}`, tone: 'met' };
  if (hasCheck) return { label: '확인 필요', tone: 'check' };
  if (metCount === 0) return { label: '조정 필요', tone: 'adjust' };
  return { label: `애매 · ${metCount}/${evals.length}`, tone: 'adjust' };
}

export function fitHeadline(tone: 'met' | 'check' | 'adjust'): string {
  if (tone === 'met') return '지금 지원해도 될 것 같아요';
  if (tone === 'check') return '확인이 필요해요';
  return '지금은 애매해요';
}

export interface QualificationEval {
  key: string;
  label: string;
  status: 'o' | 'x';
  detail: string;
}

export function evaluateQualifications(
  user: UserQualifications,
  job: JobPosting,
): QualificationEval[] {
  const results: QualificationEval[] = [];
  const { required } = job;

  if (required.minAge != null) {
    const ok = user.age != null && user.age >= required.minAge;
    results.push({
      key: 'age',
      label: '나이',
      status: ok ? 'o' : 'x',
      detail: `만 ${required.minAge}세 이상 요구 · 내 나이 ${user.age ?? '미입력'}${user.age != null ? '세' : ''}`,
    });
  }

  if (required.minExperienceMonths > 0) {
    const ok = user.experienceMonths >= required.minExperienceMonths;
    results.push({
      key: 'experience',
      label: '경력',
      status: ok ? 'o' : 'x',
      detail: `${required.minExperienceMonths}개월 이상 요구 · 내 경력 ${user.experienceMonths}개월`,
    });
  }

  if (required.requiredCertificate) {
    const ok = user.certificates.includes(required.requiredCertificate);
    results.push({
      key: 'certificate',
      label: '자격증',
      status: ok ? 'o' : 'x',
      detail: `'${required.requiredCertificate}' 필요 · ${ok ? '보유함' : '미보유'}`,
    });
  }

  if (required.requiresFullAvailability) {
    results.push({
      key: 'availability',
      label: '가능 시간',
      status: user.availableAnytime ? 'o' : 'x',
      detail: '상시 근무 가능자 요구',
    });
  }

  return results;
}

export function qualificationsAllMet(quals: QualificationEval[]): boolean {
  return quals.every((q) => q.status === 'o');
}
