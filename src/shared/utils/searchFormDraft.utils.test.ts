import { clearSearchFormDraft, readSearchFormDraft, writeSearchFormDraft } from './searchFormDraft.utils';

describe('searchFormDraft', () => {
    beforeEach(() => {
        clearSearchFormDraft();
    });

    it('round-trips Magritte filter draft', () => {
        writeSearchFormDraft({
            email: 'a@b.c',
            position: 'node',
            message: 'hi',
            workFormat: 'REMOTE',
            workScheduleByDays: 'FIVE_ON_TWO_OFF',
            workingHours: 'HOURS_8',
            orderBy: 'relevance',
            searchField: 'name',
            experience: 'between3And6',
            searchPeriod: '7',
            employmentForm: 'FULL',
        });
        const draft = readSearchFormDraft();
        expect(draft?.workFormat).toBe('REMOTE');
        expect(draft?.employmentForm).toBe('FULL');
        expect(draft?.workScheduleByDays).toBe('FIVE_ON_TWO_OFF');
        expect(draft?.workingHours).toBe('HOURS_8');
    });
});
