import type { FormValues } from '@entities/search';

/** Tab «Логин» — always on screen; editable only while creating/editing. */
export const LOGIN_FIELD_KEYS = ['email', 'password'] as const satisfies readonly (keyof FormValues)[];

/** Accordion: vacancy title + SERP URL + cover letter — only while creating/editing. */
export const VACANCY_SECTION_KEYS = ['position', 'vacancyUrl'] as const satisfies readonly (keyof FormValues)[];

/** Accordion: HH Magritte filter selects — always visible (drawer order). */
export const FILTER_OPTION_KEYS = [
    'searchField',
    'workFormat',
    'workScheduleByDays',
    'workingHours',
    'experience',
    'employmentForm',
    'searchPeriod',
    'orderBy',
] as const;
