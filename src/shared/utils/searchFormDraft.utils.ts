/**
 * Local draft for typed Search/Feedback fields.
 * Never persist HH password (security).
 */

export type SearchFormDraft = {
    email: string;
    position: string;
    message: string;
    schedule: string;
    orderBy: string;
    searchField: string;
    experience: string;
    searchPeriod: string;
};

const DRAFT_KEY = 'mh.searchFormDraft';

const asString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);

export const readSearchFormDraft = (): SearchFormDraft | null => {
    try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<SearchFormDraft> & { password?: unknown };
        // Strip legacy password if an older client wrote it.
        return {
            email: asString(parsed.email),
            position: asString(parsed.position),
            message: asString(parsed.message),
            schedule: asString(parsed.schedule),
            orderBy: asString(parsed.orderBy),
            searchField: asString(parsed.searchField),
            experience: asString(parsed.experience),
            searchPeriod: asString(parsed.searchPeriod),
        };
    } catch {
        return null;
    }
};

export const writeSearchFormDraft = (draft: SearchFormDraft): void => {
    try {
        const safe: SearchFormDraft = {
            email: draft.email,
            position: draft.position,
            message: draft.message,
            schedule: draft.schedule,
            orderBy: draft.orderBy,
            searchField: draft.searchField,
            experience: draft.experience,
            searchPeriod: draft.searchPeriod,
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(safe));
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
