export type VacancyUrlParams = {
    text?: string;
    schedule?: string;
    oredClusters?: string;
    orderBy?: string;
    searchField?: string;
    experience?: string;
    searchPeriod?: string;
    employment?: string;
};

/** Form (camelCase) key → HH query param. HH uses snake_case for these. */
export const HH_QUERY_PARAM: Record<keyof VacancyUrlParams, string> = {
    text: 'text',
    schedule: 'schedule',
    oredClusters: 'ored_clusters',
    orderBy: 'order_by',
    searchField: 'search_field',
    experience: 'experience',
    searchPeriod: 'search_period',
    employment: 'employment',
};

export function buildVacancyUrl(params: VacancyUrlParams): string {
    const baseUrl = 'https://hh.ru/search/vacancy';
    const url = new URL(baseUrl);
    const queryParams = new URLSearchParams();

    (Object.entries(params) as [keyof VacancyUrlParams, string | undefined][]).forEach(([key, value]) => {
        if (value) {
            queryParams.set(HH_QUERY_PARAM[key] ?? key, value);
        }
    });

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
