// Функция для формирования URL на основе параметров
export function buildVacancyUrl(params: {
    text?: string;
    schedule?: string;
    oredClusters?: string;
    orderBy?: string;
    searchField?: string;
    experience?: string;
    searchPeriod?: string;
}): string {

    const baseUrl = 'https://hh.ru/search/vacancy';
    const url = new URL(baseUrl);
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
          queryParams.set(key, value);
        }
      });

    queryParams.set('excluded_text', '');
    queryParams.set('hhtmFrom', 'vacancy_search_list');
    queryParams.set('hhtmFromLabel', 'vacancy_search_line');

    url.search = queryParams.toString();

    return url.toString();
}
