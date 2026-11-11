import { buildVacancyUrl } from './buildVacancyUrl';

describe('buildVacancyUrl', () => {
    it('builds hh search URL with provided params', () => {
        const url = buildVacancyUrl({ text: 'frontend', experience: 'between1And3' });
        expect(url.startsWith('https://hh.ru/search/vacancy?')).toBe(true);
        expect(url).toContain('text=frontend');
        expect(url).toContain('experience=between1And3');
        expect(url).toContain('hhtmFrom=vacancy_search_list');
    });

    it('omits empty optional params', () => {
        const url = buildVacancyUrl({ text: '', schedule: undefined });
        expect(url).not.toMatch(/(?:[?&])text=/);
        expect(url).not.toMatch(/(?:[?&])schedule=/);
        expect(url).toContain('excluded_text=');
    });
});
