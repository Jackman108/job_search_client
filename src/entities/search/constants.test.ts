import { DEFAULT_SEARCH, FORM_CONFIG, FORM_LABELS, FORM_PARAMS } from './constants';

const values = (key: keyof typeof FORM_CONFIG.options) => FORM_CONFIG.options[key].map((o) => o.value);

describe('search form constants', () => {
    it('has label + param for every select option group', () => {
        Object.keys(FORM_CONFIG.options).forEach((key) => {
            expect(FORM_LABELS).toHaveProperty(key);
            expect(FORM_PARAMS).toHaveProperty(key);
        });
    });

    it('covers Magritte work_format', () => {
        expect(values('workFormat')).toEqual(['', 'ON_SITE', 'REMOTE', 'HYBRID', 'FIELD_WORK']);
    });

    it('covers Magritte work_schedule_by_days incl. 5/2 and flexible', () => {
        expect(values('workScheduleByDays')).toEqual(
            expect.arrayContaining(['', 'FIVE_ON_TWO_OFF', 'FLEXIBLE', 'WEEKEND', 'OTHER']),
        );
    });

    it('covers Magritte working_hours', () => {
        expect(values('workingHours')).toEqual(expect.arrayContaining(['', 'HOURS_8', 'HOURS_12', 'FLEXIBLE']));
    });

    it('uses noExperience for "no experience" (not an empty string)', () => {
        expect(values('experience')).toContain('noExperience');
        expect(values('experience')).not.toContain('');
    });

    it('offers month and all-time search periods', () => {
        expect(values('searchPeriod')).toEqual(expect.arrayContaining(['1', '3', '7', '30', '0']));
    });

    it('offers employment_form with internship and any default', () => {
        expect(values('employmentForm')).toEqual(['', 'FULL', 'PART', 'PROJECT', 'FLY_IN_FLY_OUT', 'internship']);
        expect(DEFAULT_SEARCH.employmentForm).toBe('');
    });

    it('includes distance in order_by', () => {
        expect(values('orderBy')).toContain('distance');
    });

    it('defaults point at existing options', () => {
        expect(values('workFormat')).toContain(DEFAULT_SEARCH.workFormat);
        expect(values('orderBy')).toContain(DEFAULT_SEARCH.orderBy);
        expect(values('searchField')).toContain(DEFAULT_SEARCH.searchField);
        expect(values('experience')).toContain(DEFAULT_SEARCH.experience);
        expect(values('searchPeriod')).toContain(DEFAULT_SEARCH.searchPeriod);
    });
});
