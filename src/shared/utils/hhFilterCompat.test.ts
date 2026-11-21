import {
    normalizeEmploymentForm,
    normalizeWorkFormat,
    readEmploymentFormFromUrl,
    resolveWorkFormat,
} from './hhFilterCompat';

describe('hhFilterCompat', () => {
    it('maps legacy schedule → work_format', () => {
        expect(normalizeWorkFormat('remote')).toBe('REMOTE');
        expect(normalizeWorkFormat('fullDay')).toBe('ON_SITE');
        expect(normalizeWorkFormat('flexible')).toBe('HYBRID');
        expect(normalizeWorkFormat('flyInFlyOut')).toBe('FIELD_WORK');
        expect(normalizeWorkFormat('REMOTE')).toBe('REMOTE');
    });

    it('maps legacy employment → employment_form', () => {
        expect(normalizeEmploymentForm('full')).toBe('FULL');
        expect(normalizeEmploymentForm('part')).toBe('PART');
        expect(normalizeEmploymentForm('project')).toBe('PROJECT');
        expect(normalizeEmploymentForm('probation')).toBe('internship');
        expect(normalizeEmploymentForm('FLY_IN_FLY_OUT')).toBe('FLY_IN_FLY_OUT');
    });

    it('reads employment_form / internship from URL', () => {
        expect(readEmploymentFormFromUrl('https://hh.ru/search/vacancy?employment_form=FULL')).toBe('FULL');
        expect(readEmploymentFormFromUrl('https://hh.ru/search/vacancy?employment=part')).toBe('PART');
        expect(readEmploymentFormFromUrl('https://hh.ru/search/vacancy?label=internship')).toBe('internship');
        expect(readEmploymentFormFromUrl('')).toBe('');
    });

    it('resolves work_format from URL over DB schedule', () => {
        expect(resolveWorkFormat('https://hh.ru/search/vacancy?work_format=HYBRID', 'remote')).toBe('HYBRID');
        expect(resolveWorkFormat('https://hh.ru/search/vacancy?schedule=remote', null)).toBe('REMOTE');
        expect(resolveWorkFormat(undefined, 'fullDay')).toBe('ON_SITE');
    });
});
