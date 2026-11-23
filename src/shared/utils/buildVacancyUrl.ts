export type VacancyUrlParams = {
    text?: string;
    /** HH area id — default Moscow (`1`) so account region (e.g. Жлобин) does not zero SERP. */
    area?: string;
    workFormat?: string;
    workScheduleByDays?: string;
    workingHours?: string;
    oredClusters?: string;
    orderBy?: string;
    searchField?: string;
    experience?: string;
    searchPeriod?: string;
    employmentForm?: string;
};

/** Form (camelCase) key → HH Magritte query param. */
export const HH_QUERY_PARAM: Record<Exclude<keyof VacancyUrlParams, 'employmentForm'>, string> = {
    text: 'text',
    area: 'area',
    workFormat: 'work_format',
    workScheduleByDays: 'work_schedule_by_days',
    workingHours: 'working_hours',
    oredClusters: 'ored_clusters',
    orderBy: 'order_by',
    searchField: 'search_field',
    experience: 'experience',
    searchPeriod: 'search_period',
};

/** Moscow — matches resume target; override via `area` when needed. */
export const DEFAULT_HH_AREA = '1';

export function buildVacancyUrl(params: VacancyUrlParams): string {
    const baseUrl = 'https://hh.ru/search/vacancy';
    const url = new URL(baseUrl);
    const queryParams = new URLSearchParams();

    (Object.entries(params) as [keyof VacancyUrlParams, string | undefined][]).forEach(([key, value]) => {
        if (!value) return;
        if (key === 'employmentForm') {
            if (value === 'internship') {
                queryParams.set('label', 'internship');
            } else {
                queryParams.set('employment_form', value);
            }
            return;
        }
        queryParams.set(HH_QUERY_PARAM[key] ?? key, value);
    });

    if (!queryParams.get('area')) {
        queryParams.set('area', DEFAULT_HH_AREA);
    }

    queryParams.set('excluded_text', '');
    queryParams.set('hhtmFrom', 'vacancy_search_list');
    queryParams.set('hhtmFromLabel', 'vacancy_search_line');

    url.search = queryParams.toString();

    return url.toString();
}

/** Read a single HH query param from a stored vacancy URL ('' when missing / invalid URL). */
export function readVacancyUrlParam(vacancyUrl: string | undefined, hhParam: string): string {
    if (!vacancyUrl) return '';
    try {
        return new URL(vacancyUrl).searchParams.get(hhParam) ?? '';
    } catch {
        return '';
    }
}
