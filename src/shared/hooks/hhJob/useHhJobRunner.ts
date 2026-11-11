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
    const [awaitingCaptcha, setAwaitingCaptcha] = useState(false);
    const [captchaSrc, setCaptchaSrc] = useState<string | undefined>();
    const [tableRevision, setTableRevision] = useState<string | undefined>();
    const [captchaBusy, setCaptchaBusy] = useState(false);
    const [captchaError, setCaptchaError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);
    const watchPromiseRef = useRef<Promise<HhJobStatusResponse> | null>(null);
    const watchingIdRef = useRef<string | null>(null);

    const isJobActive = status === 'queued' || status === 'running';

    const applyPollUpdate = useCallback((next: HhJobStatusResponse) => {
        setStatus(next.status);
        setAwaitingCaptcha(next.awaitingCaptcha === true);
        setCaptchaSrc(next.captchaSrc);
        if (next.lastEventAt) {
            setTableRevision(next.lastEventAt);
        }
    }, []);

    const clearJob = useCallback(() => {
        clearActiveHhJob();
        setActiveJob(null);
        setStatus('idle');
        setAwaitingCaptcha(false);
        setCaptchaSrc(undefined);
        setTableRevision(undefined);
        setCaptchaError(null);
        setCaptchaBusy(false);
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
            setCaptchaError(null);
            watchingIdRef.current = jobId;

            const promise = pollHhJobUntilSettled(request, jobId, {
                signal: ac.signal,
                onUpdate: applyPollUpdate,
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
        [abortPolling, applyPollUpdate, clearJob, request],
    );

    const submitCaptchaAnswer = useCallback(
        async (answer: string) => {
            if (!activeJob?.jobId) return;
            setCaptchaBusy(true);
            setCaptchaError(null);
            try {
                await request('post', `/jobs/${activeJob.jobId}/captcha`, { answer });
                setAwaitingCaptcha(false);
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Не удалось отправить ответ капчи';
                setCaptchaError(message);
                throw error;
            } finally {
                setCaptchaBusy(false);
            }
        },
        [activeJob?.jobId, request],
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
        awaitingCaptcha,
        captchaSrc,
        tableRevision,
        captchaBusy,
        captchaError,
        watchJob,
        stopJob,
        clearJob,
        submitCaptchaAnswer,
        isAbortError,
    };
};

export default useHhJobRunner;
