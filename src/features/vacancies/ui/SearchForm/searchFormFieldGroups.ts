import type { FormValues } from '@entities/search';

/** Tab «Логин» — always on screen; editable only while creating/editing. */
export const LOGIN_FIELD_KEYS = ['email', 'password'] as const satisfies readonly (keyof FormValues)[];

/** Accordion: vacancy title + SERP URL + cover letter — only while creating/editing. */
export const VACANCY_SECTION_KEYS = ['position', 'vacancyUrl'] as const satisfies readonly (keyof FormValues)[];

/** Accordion: HH filter selects — always visible. */
export const FILTER_OPTION_KEYS = [
    'schedule',
    'orderBy',
    'searchField',
    'experience',
    'searchPeriod',
    'employment',
] as const;
