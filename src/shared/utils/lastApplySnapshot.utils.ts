import type { FormValues } from '@entities/search';
import { DEFAULT_SEARCH } from '@entities/search';

const KEY = 'mh.lastApplySnapshot.v1';

export type LastApplySnapshot = FormValues & { savedAt: string };

export function writeLastApplySnapshot(values: Partial<FormValues> & Pick<FormValues, 'email' | 'vacancyUrl'>): void {
    try {
        const snap: LastApplySnapshot = {
            email: values.email,
            // Never persist HH password in sessionStorage (XSS / shared device).
            password: '',
            position: values.position || '',
            message: values.message || '',
            vacancyUrl: values.vacancyUrl,
            workFormat: values.workFormat || DEFAULT_SEARCH.workFormat,
            workScheduleByDays: values.workScheduleByDays || DEFAULT_SEARCH.workScheduleByDays,
            workingHours: values.workingHours || DEFAULT_SEARCH.workingHours,
            orderBy: values.orderBy || DEFAULT_SEARCH.orderBy,
            searchField: values.searchField || DEFAULT_SEARCH.searchField,
            experience: values.experience || DEFAULT_SEARCH.experience,
            searchPeriod: values.searchPeriod || DEFAULT_SEARCH.searchPeriod,
            employmentForm: values.employmentForm || DEFAULT_SEARCH.employmentForm,
            savedAt: new Date().toISOString(),
        };
        sessionStorage.setItem(KEY, JSON.stringify(snap));
    } catch {
        // ignore quota / private mode
    }
}

export function readLastApplySnapshot(): LastApplySnapshot | null {
    try {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as LastApplySnapshot;
        if (!parsed?.email || !parsed?.vacancyUrl) return null;
        return parsed;
    } catch {
        return null;
    }
}
