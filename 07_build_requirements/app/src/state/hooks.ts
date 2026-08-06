import { useLocalStorageState } from './useLocalStorageState';
import type { Application, Resume, UserConditions, UserQualifications } from '../data/types';

const EMPTY_CONDITIONS: UserConditions = {
  jobTypes: [],
  minWage: 0,
  days: [],
  timeSlots: [],
  maxWalkMinutes: 0,
};

const EMPTY_QUALIFICATIONS: UserQualifications = {
  age: null,
  experienceMonths: 0,
  certificates: [],
  availableAnytime: false,
};

const DEFAULT_RESUME: Resume = {
  name: '기본 이력서',
  selected: true,
  summary: '아직 작성된 이력서 항목이 없어요.',
};

export function useUserConditions() {
  return useLocalStorageState<UserConditions>('bh_conditions', EMPTY_CONDITIONS);
}

export function useUserQualifications() {
  return useLocalStorageState<UserQualifications>('bh_qualifications', EMPTY_QUALIFICATIONS);
}

export function useResume() {
  return useLocalStorageState<Resume>('bh_resume', DEFAULT_RESUME);
}

export function useApplications() {
  return useLocalStorageState<Application[]>('bh_applications', []);
}

export function hasSetConditions(conditions: UserConditions): boolean {
  return conditions.jobTypes.length > 0 && conditions.minWage > 0 && conditions.days.length > 0;
}
