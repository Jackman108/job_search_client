import { clearSearchFormDraft, readSearchFormDraft, writeSearchFormDraft } from './searchFormDraft.utils';

describe('searchFormDraft.utils', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('persists safe fields and never keeps password', () => {
        writeSearchFormDraft({
            email: 'a@b.c',
            position: 'FE',
            message: 'hi',
            schedule: 'remote',
            orderBy: 'relevance',
            searchField: 'name',
            experience: 'between3And6',
            searchPeriod: '3',
        });
        const draft = readSearchFormDraft();
        expect(draft?.email).toBe('a@b.c');
        expect(draft?.position).toBe('FE');
        expect(JSON.stringify(draft)).not.toMatch(/password/i);
    });

    it('strips legacy password keys when reading', () => {
        localStorage.setItem(
            'mh.searchFormDraft',
            JSON.stringify({ email: 'x@y.z', position: 'p', password: 'secret' }),
        );
        const draft = readSearchFormDraft();
        expect(draft?.email).toBe('x@y.z');
        expect(JSON.stringify(draft)).not.toMatch(/password/i);
        clearSearchFormDraft();
        expect(readSearchFormDraft()).toBeNull();
    });
});
