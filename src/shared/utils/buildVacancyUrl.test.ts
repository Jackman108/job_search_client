import { buildVacancyUrl, readVacancyUrlParam } from './buildVacancyUrl';

describe('buildVacancyUrl', () => {
    it('builds Magritte work_format + employment_form params', () => {
        const url = buildVacancyUrl({ text: 'frontend', experience: 'between1And3', workFormat: 'REMOTE' });
        expect(url).toContain('text=frontend');
        expect(url).toContain('experience=between1And3');
        expect(url).toContain('work_format=REMOTE');
        expect(url).not.toMatch(/(?:[?&])schedule=/);
    });

    it('skips empty optional filters', () => {
        const url = buildVacancyUrl({ text: '', workFormat: undefined, employmentForm: '' });
        expect(url).toContain('hh.ru/search/vacancy');
        expect(url).not.toMatch(/(?:[?&])work_format=/);
        expect(url).not.toMatch(/(?:[?&])employment_form=/);
        expect(url).not.toMatch(/(?:[?&])employment=/);
    });

    it('maps all Magritte filters into query string', () => {
        const url = buildVacancyUrl({
            text: 'node',
            orderBy: 'salary_desc',
            searchField: 'name',
            searchPeriod: '30',
            employmentForm: 'PART',
            workFormat: 'HYBRID',
            experience: 'noExperience',
            workScheduleByDays: 'FIVE_ON_TWO_OFF',
            workingHours: 'HOURS_8',
            oredClusters: 'true',
        });
        const params = new URL(url).searchParams;
        expect(params.get('text')).toBe('node');
        expect(params.get('order_by')).toBe('salary_desc');
        expect(params.get('search_field')).toBe('name');
        expect(params.get('search_period')).toBe('30');
        expect(params.get('employment_form')).toBe('PART');
        expect(params.get('work_format')).toBe('HYBRID');
        expect(params.get('experience')).toBe('noExperience');
        expect(params.get('work_schedule_by_days')).toBe('FIVE_ON_TWO_OFF');
        expect(params.get('working_hours')).toBe('HOURS_8');
        ['schedule', 'employment'].forEach((legacy) => expect(params.get(legacy)).toBeNull());
    });

    it('keeps search_period=0 (all time)', () => {
        expect(new URL(buildVacancyUrl({ searchPeriod: '0' })).searchParams.get('search_period')).toBe('0');
    });

    it('maps internship to label=internship', () => {
        const url = buildVacancyUrl({ employmentForm: 'internship' });
        expect(new URL(url).searchParams.get('label')).toBe('internship');
        expect(new URL(url).searchParams.get('employment_form')).toBeNull();
    });

    it('readVacancyUrlParam reads HH keys', () => {
        const url = buildVacancyUrl({ employmentForm: 'FULL', workFormat: 'REMOTE' });
        expect(readVacancyUrlParam(url, 'employment_form')).toBe('FULL');
        expect(readVacancyUrlParam(url, 'work_format')).toBe('REMOTE');
        expect(readVacancyUrlParam('', 'employment_form')).toBe('');
        expect(readVacancyUrlParam(undefined, 'employment_form')).toBe('');
        expect(readVacancyUrlParam('not a url', 'employment_form')).toBe('');
    });
});
