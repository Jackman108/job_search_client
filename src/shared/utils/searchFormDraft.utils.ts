/** Local draft for position/message only — never HH password. */

export type SearchFormDraft = {
    position: string;
    message: string;
};

const DRAFT_KEY = 'mh.searchFormDraft';

export const readSearchFormDraft = (): SearchFormDraft | null => {
    try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<SearchFormDraft>;
        return {
            position: typeof parsed.position === 'string' ? parsed.position : '',
            message: typeof parsed.message === 'string' ? parsed.message : '',
        };
    } catch {
        return null;
    }
};

export const writeSearchFormDraft = (draft: SearchFormDraft): void => {
    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
        // Quota / private mode — ignore.
    }
};

export const clearSearchFormDraft = (): void => {
    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch {
        // ignore
    }
};
