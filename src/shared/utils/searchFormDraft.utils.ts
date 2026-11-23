const DRAFT_KEY = 'mh.searchFormDraft.v2';

export type SearchFormDraft = {
    email: string;
    position: string;
    message: string;
    workFormat: string;
    workScheduleByDays: string;
    workingHours: string;
    orderBy: string;
    searchField: string;
    experience: string;
    searchPeriod: string;
    employmentForm: string;
};

const asString = (v: unknown): string => (typeof v === 'string' ? v : '');

export function readSearchFormDraft(): SearchFormDraft | null {
    try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<SearchFormDraft> & {
            /** legacy v1 keys */
            schedule?: string;
            employment?: string;
        };
        return {
            email: asString(parsed.email),
            position: asString(parsed.position),
            message: asString(parsed.message),
            workFormat: asString(parsed.workFormat || parsed.schedule),
            workScheduleByDays: asString(parsed.workScheduleByDays),
            workingHours: asString(parsed.workingHours),
            orderBy: asString(parsed.orderBy),
            searchField: asString(parsed.searchField),
            experience: asString(parsed.experience),
            searchPeriod: asString(parsed.searchPeriod),
            employmentForm: asString(parsed.employmentForm || parsed.employment),
        };
    } catch {
        return null;
    }
}

export function writeSearchFormDraft(draft: SearchFormDraft): void {
    try {
        localStorage.setItem(
            DRAFT_KEY,
            JSON.stringify({
                email: draft.email,
                position: draft.position,
                message: draft.message,
                workFormat: draft.workFormat,
                workScheduleByDays: draft.workScheduleByDays,
                workingHours: draft.workingHours,
                orderBy: draft.orderBy,
                searchField: draft.searchField,
                experience: draft.experience,
                searchPeriod: draft.searchPeriod,
                employmentForm: draft.employmentForm,
            }),
        );
    } catch {
        // ignore quota / private mode
    }
}

export function clearSearchFormDraft(): void {
    try {
        localStorage.removeItem(DRAFT_KEY);
        localStorage.removeItem('mh.searchFormDraft.v1');
    } catch {
        // ignore
    }
}
