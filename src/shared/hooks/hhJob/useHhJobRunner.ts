import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { useDataApi } from '@api';
import type { HhJobCompletion, HhJobKind, HhJobStatus, HhJobStatusResponse } from '@type';
import { clearActiveHhJob, readActiveHhJob, writeActiveHhJob, type ActiveHhJob } from '@shared/utils/activeHhJob.utils';
import { pollHhJobUntilSettled } from '@shared/utils/pollHhJob';
import useCaptchaImageUrl from './useCaptchaImageUrl';

const isAbortError = (error: unknown) =>
    (error instanceof DOMException && error.name === 'AbortError') ||
    (error instanceof Error && error.name === 'AbortError');

function completionFromResult(result: HhJobStatusResponse): HhJobCompletion | null {
    if (result.kind !== 'sendFeedback') return null;
    if (result.status !== 'done' && result.status !== 'error') return null;
    const success = result.summary?.success ?? 0;
    const skipped = result.summary?.skipped ?? 0;
    return {
        found: result.summary?.found,
        success,
        skipped,
        pages: result.summary?.pages,
        lastEvent: result.lastEvent,
    };
}

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
    const [remoteCaptchaSrc, setRemoteCaptchaSrc] = useState<string | undefined>();
    const [hasCaptchaImage, setHasCaptchaImage] = useState(false);
    const [tableRevision, setTableRevision] = useState<string | undefined>();
    const [captchaBusy, setCaptchaBusy] = useState(false);
    const [captchaError, setCaptchaError] = useState<string | null>(null);
    const [completion, setCompletion] = useState<HhJobCompletion | null>(null);
    const [foundNotice, setFoundNotice] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);
    const watchPromiseRef = useRef<Promise<HhJobStatusResponse> | null>(null);
    const watchingIdRef = useRef<string | null>(null);

    const isJobActive = status === 'queued' || status === 'running';
    const captchaSrc = useCaptchaImageUrl(
        activeJob?.jobId,
        awaitingCaptcha,
        hasCaptchaImage,
        remoteCaptchaSrc,
        tableRevision,
    );

    const applyPollUpdate = useCallback((next: HhJobStatusResponse) => {
        setStatus(next.status);
        setAwaitingCaptcha(next.awaitingCaptcha === true);
        setRemoteCaptchaSrc(next.captchaSrc);
        setHasCaptchaImage(next.hasCaptchaImage === true);
        if (next.lastEventAt) {
            setTableRevision(next.lastEventAt);
        }
        if (next.lastEvent && /^Найдено\s+\d+/i.test(next.lastEvent)) {
            setFoundNotice(next.lastEvent);
        }
    }, []);

    const clearJob = useCallback(() => {
        clearActiveHhJob();
        setActiveJob(null);
        setStatus('idle');
        setAwaitingCaptcha(false);
        setRemoteCaptchaSrc(undefined);
        setHasCaptchaImage(false);
        setTableRevision(undefined);
        setCaptchaError(null);
        setCaptchaBusy(false);
        setFoundNotice(null);
        watchingIdRef.current = null;
        watchPromiseRef.current = null;
    }, []);

    const dismissCompletion = useCallback(() => {
        setCompletion(null);
    }, []);

    const dismissFoundNotice = useCallback(() => {
        setFoundNotice(null);
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
            setCompletion(null);
            setFoundNotice(null);
            watchingIdRef.current = jobId;

            const promise = pollHhJobUntilSettled(request, jobId, {
                signal: ac.signal,
                onUpdate: applyPollUpdate,
            })
                .then((result) => {
                    if (watchingIdRef.current === jobId) {
                        const done = completionFromResult(result);
                        if (done) setCompletion(done);
                        clearJob();
                    }
                    if (result.status === 'error' || result.status === 'cancelled') {
                        const detail =
                            result.error ||
                            result.lastEvent ||
                            (result.captchaSrc ? `CAPTCHA detected restart ${result.captchaSrc}` : undefined) ||
                            'HH job failed';
                        throw new Error(detail);
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
                // Keep modal until poll clears awaitingCaptcha (wrong answer → retry).
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
            setCompletion(null);
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
        setCompletion(null);
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
        completion,
        dismissCompletion,
        foundNotice,
        dismissFoundNotice,
        watchJob,
        stopJob,
        clearJob,
        submitCaptchaAnswer,
        isAbortError,
    };
};

export default useHhJobRunner;
