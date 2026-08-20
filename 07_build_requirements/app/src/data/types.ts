export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const DAY_LABEL: Record<DayKey, string> = {
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
  fri: '금',
  sat: '토',
  sun: '일',
};

export type TimeSlot = '오전' | '오후' | '저녁' | '심야' | '협의';

export interface UserConditions {
  jobTypes: string[];
  minWage: number;
  days: DayKey[];
  timeSlots: TimeSlot[];
  maxWalkMinutes: number;
}

export interface UserQualifications {
  age: number | null;
  experienceMonths: number;
  certificates: string[];
  availableAnytime: boolean;
}

export interface Resume {
  name: string;
  selected: boolean;
  summary: string;
}

export interface RequiredQualifications {
  minAge: number | null;
  minExperienceMonths: number;
  requiredCertificate: string | null;
  requiresFullAvailability: boolean;
}

export interface JobPosting {
  id: string;
  company: string;
  title: string;
  jobType: string;
  wage: number;
  days: DayKey[];
  timeSlot: TimeSlot;
  walkMinutes: number;
  location: string;
  duration: string;
  required: RequiredQualifications;
  preferred: string[];
  postedAt: string;
}

export interface Application {
  jobId: string;
  appliedAt: string;
}
