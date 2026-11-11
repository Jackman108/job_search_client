import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { useDataApi } from '@api';
import type { HhJobKind, HhJobStatus, HhJobStatusResponse } from '@type';
import { clearActiveHhJob, readActiveHhJob, writeActiveHhJob, type ActiveHhJob } from '@shared/utils/activeHhJob.utils';
import { pollHhJobUntilSettled } from '@shared/utils/pollHhJob';

const isAbortError = (error: unknown) =>
    (error instanceof DOMException && error.name === 'AbortError') ||
    (error instanceof Error && error.name === 'AbortError');

/**
 * App-level HH job lifecycle: persists jobId, resumes poll after panel close / remount.
 * AbortController is owned here — abort only on Stop or logout.
 */
const useHhJobRunner = () => {
    const { request } = useDataApi();
    const { token } = useAuth();
    const [activeJob, setActiveJob] = useState<ActiveHhJob | null>(() => readActiveHhJob());
    const [status, setStatus] = useState<HhJobStatus | 'idle'>(() => (readActiveHhJob() ? 'queued' : 'idle'));
    const abortRef = useRef<AbortController | null>(null);
    const watchPromiseRef = useRef<Promise<HhJobStatusResponse> | null>(null);
    const watchingIdRef = useRef<string | null>(null);

    const isJobActive = status === 'queued' || status === 'running';

    const clearJob = useCallback(() => {
        clearActiveHhJob();
        setActiveJob(null);
        setStatus('idle');
        watchingIdRef.current = null;
        watchPromiseRef.current = null;
    }, []);

    const abortPolling = useCallback(() => {
        abortRef.current?.abort();
        abortRef.current = null;
    }, []);

    const watchJob = useCallback(
        async (jobId: string, kind: HhJobKind): Promise<HhJobStatusResponse> => {
            if (watchingIdRef.current === jobId && watchPromiseRef.current) {
                return watchPromiseRef.current;
            }

            abortPolling();
            const ac = new AbortController();
            abortRef.current = ac;

            const job = { jobId, kind };
            writeActiveHhJob(job);
            setActiveJob(job);
            setStatus('queued');
            watchingIdRef.current = jobId;

            const promise = pollHhJobUntilSettled(request, jobId, {
                signal: ac.signal,
                onUpdate: (next) => setStatus(next.status),
            })
                .then((result) => {
                    if (watchingIdRef.current === jobId) {
                        clearJob();
                    }
                    return result;
                })
                .catch((error: unknown) => {
                    if (watchingIdRef.current === jobId) {
                        clearJob();
                    }
                    throw error;
                });

            watchPromiseRef.current = promise;
            return promise;
        },
        [abortPolling, clearJob, request],
    );

    const stopJob = useCallback(async () => {
        abortPolling();
        try {
            await request('post', '/stop', {});
        } catch (error) {
            console.error('Stop error:', error);
        } finally {
            clearJob();
        }
    }, [abortPolling, clearJob, request]);

    // Resume poll when jobId is in sessionStorage (panel remount / tab return).
    useEffect(() => {
        if (!token) return;
        const stored = readActiveHhJob();
        if (!stored) return;
        if (watchingIdRef.current === stored.jobId) return;

        void watchJob(stored.jobId, stored.kind).catch((error: unknown) => {
            if (!isAbortError(error)) {
                console.error('HH job resume failed:', error);
            }
        });
    }, [token, watchJob]);

    // Logout: abort poll and drop persisted jobId.
    useEffect(() => {
        if (token) return;
        if (!activeJob && status === 'idle') return;
        abortPolling();
        clearJob();
    }, [token, activeJob, status, abortPolling, clearJob]);

    return {
        activeJob,
        status,
        isJobActive,
        watchJob,
        stopJob,
        clearJob,
        isAbortError,
    };
};

export default useHhJobRunner;
