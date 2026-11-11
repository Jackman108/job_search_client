import type { HhJobKind } from '../types/HhJob.types';

/** Survives panel unmount and tab switches; cleared on settle / stop / logout. */
export type ActiveHhJob = {
    jobId: string;
    kind: HhJobKind;
};

const STORAGE_KEY = 'mh.activeHhJob';

export const readActiveHhJob = (): ActiveHhJob | null => {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<ActiveHhJob>;
        if (typeof parsed.jobId !== 'string' || !parsed.jobId) return null;
        if (parsed.kind !== 'sendFeedback' && parsed.kind !== 'getFeedback') return null;
        return { jobId: parsed.jobId, kind: parsed.kind };
    } catch {
        return null;
    }
};

export const writeActiveHhJob = (job: ActiveHhJob): void => {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(job));
    } catch {
        // Quota / private mode — ignore.
    }
};

export const clearActiveHhJob = (): void => {
    try {
        sessionStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }
};

export const endpointToHhJobKind = (endpoint: string): HhJobKind => {
    if (endpoint.includes('refresh')) return 'getFeedback';
    return 'sendFeedback';
};
