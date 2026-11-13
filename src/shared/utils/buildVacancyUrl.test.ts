import { buildVacancyUrl, readVacancyUrlParam } from './buildVacancyUrl';

describe('buildVacancyUrl', () => {
    it('builds hh search URL with provided params', () => {
        const url = buildVacancyUrl({ text: 'frontend', experience: 'between1And3' });
        expect(url.startsWith('https://hh.ru/search/vacancy?')).toBe(true);
        expect(url).toContain('text=frontend');
        expect(url).toContain('experience=between1And3');
        expect(url).toContain('hhtmFrom=vacancy_search_list');
    });

    it('omits empty optional params', () => {
        const url = buildVacancyUrl({ text: '', schedule: undefined, employment: '' });
        expect(url).not.toMatch(/(?:[?&])text=/);
        expect(url).not.toMatch(/(?:[?&])schedule=/);
        expect(url).not.toMatch(/(?:[?&])employment=/);
        expect(url).toContain('excluded_text=');
    });

    it('maps camelCase form keys to HH snake_case params', () => {
        const params = new URL(
            buildVacancyUrl({
                oredClusters: 'true',
                orderBy: 'salary_desc',
                searchField: 'name',
                searchPeriod: '30',
                employment: 'part',
                schedule: 'flyInFlyOut',
                experience: 'noExperience',
            }),
        ).searchParams;
        expect(params.get('ored_clusters')).toBe('true');
        expect(params.get('order_by')).toBe('salary_desc');
        expect(params.get('search_field')).toBe('name');
        expect(params.get('search_period')).toBe('30');
        expect(params.get('employment')).toBe('part');
        expect(params.get('schedule')).toBe('flyInFlyOut');
        expect(params.get('experience')).toBe('noExperience');
        ['orderBy', 'searchField', 'searchPeriod', 'oredClusters'].forEach((legacy) =>
            expect(params.has(legacy)).toBe(false),
        );
    });

    it('keeps search_period=0 (all time)', () => {
        expect(new URL(buildVacancyUrl({ searchPeriod: '0' })).searchParams.get('search_period')).toBe('0');
    });
});

describe('readVacancyUrlParam', () => {
    it('reads a param from a stored vacancy URL', () => {
        const url = buildVacancyUrl({ employment: 'probation' });
        expect(readVacancyUrlParam(url, 'employment')).toBe('probation');
    });

    it('returns empty string for missing param, empty or invalid URL', () => {
        expect(readVacancyUrlParam(buildVacancyUrl({}), 'employment')).toBe('');
        expect(readVacancyUrlParam('', 'employment')).toBe('');
        expect(readVacancyUrlParam(undefined, 'employment')).toBe('');
        expect(readVacancyUrlParam('not a url', 'employment')).toBe('');
    });
});
