import { DEFAULT_SEARCH, FORM_CONFIG, FORM_LABELS, FORM_PARAMS } from './constants';

const values = (key: keyof typeof FORM_CONFIG.options) => FORM_CONFIG.options[key].map((o) => o.value);

describe('search form constants', () => {
    it('has label + param for every select option group', () => {
        Object.keys(FORM_CONFIG.options).forEach((key) => {
            expect(FORM_LABELS).toHaveProperty(key);
            expect(FORM_PARAMS).toHaveProperty(key);
        });
    });

    it('covers HH schedule incl. fly-in/fly-out', () => {
        expect(values('schedule')).toEqual(['remote', 'fullDay', 'flexible', 'shift', 'flyInFlyOut']);
    });

    it('uses noExperience for "no experience" (not an empty string)', () => {
        expect(values('experience')).toContain('noExperience');
        expect(values('experience')).not.toContain('');
    });

    it('offers month and all-time search periods', () => {
        expect(values('searchPeriod')).toEqual(expect.arrayContaining(['1', '3', '7', '30', '0']));
    });

    it('offers employment filter with "any" default', () => {
        expect(values('employment')).toEqual(['', 'full', 'part', 'project', 'probation']);
        expect(DEFAULT_SEARCH.employment).toBe('');
    });

    it('defaults point at existing options', () => {
        expect(values('schedule')).toContain(DEFAULT_SEARCH.schedule);
        expect(values('orderBy')).toContain(DEFAULT_SEARCH.orderBy);
        expect(values('searchField')).toContain(DEFAULT_SEARCH.searchField);
        expect(values('experience')).toContain(DEFAULT_SEARCH.experience);
        expect(values('searchPeriod')).toContain(DEFAULT_SEARCH.searchPeriod);
    });
});
