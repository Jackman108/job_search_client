import type { HhJobStatusResponse, HhQueueResponse } from '../types/HhJob.types';

const DEFAULT_INTERVAL_MS = 2000;
const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000;

const sleep = (ms: number, signal?: AbortSignal) =>
    new Promise<void>((resolve, reject) => {
        if (signal?.aborted) {
            reject(new DOMException('HH job poll aborted', 'AbortError'));
            return;
        }
        const timer = setTimeout(() => resolve(), ms);
        const onAbort = () => {
            clearTimeout(timer);
            reject(new DOMException('HH job poll aborted', 'AbortError'));
        };
        signal?.addEventListener('abort', onAbort, { once: true });
    });

export const isHhQueueResponse = (data: unknown): data is HhQueueResponse => {
    return Boolean(
        data && typeof data === 'object' && 'jobId' in data && typeof (data as HhQueueResponse).jobId === 'string',
    );
};

type RequestFn = <T = unknown>(
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    data?: unknown,
) => Promise<T>;

export type PollHhJobOptions = {
    intervalMs?: number;
    timeoutMs?: number;
    /** Abort only on explicit Stop / logout — not on panel unmount. */
    signal?: AbortSignal;
    /** Fired each successful poll (CAPTCHA/lastEvent available while running). */
    onUpdate?: (status: HhJobStatusResponse) => void;
};

/**
 * Poll GET /jobs/:id until done|error. Detached worker does not push WS into the API process;
 * job file fields (lastEvent / captchaSrc / error) are the source of truth.
 */
export async function pollHhJobUntilSettled(
    request: RequestFn,
    jobId: string,
    options?: PollHhJobOptions,
): Promise<HhJobStatusResponse> {
    const intervalMs = options?.intervalMs ?? DEFAULT_INTERVAL_MS;
    const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const signal = options?.signal;
    const started = Date.now();

    /** Transient 401/network: keep polling so CAPTCHA modal survives token refresh. */
    const maxTransientFailures = 5;
    let transientFailures = 0;

    while (Date.now() - started < timeoutMs) {
        if (signal?.aborted) {
            throw new DOMException('HH job poll aborted', 'AbortError');
        }

        try {
            const status = await request<HhJobStatusResponse>('get', `/jobs/${jobId}`);
            transientFailures = 0;
            options?.onUpdate?.(status);

            if (status.status === 'done' || status.status === 'error' || status.status === 'cancelled') {
                // Return full payload (incl. summary) — caller shows completion modal / maps errors.
                return status;
            }
        } catch (error) {
            if (signal?.aborted || (error instanceof DOMException && error.name === 'AbortError')) {
                throw error instanceof DOMException
                    ? error
                    : new DOMException('HH job poll aborted', 'AbortError');
            }
            transientFailures += 1;
            if (transientFailures >= maxTransientFailures) throw error;
        }
        await sleep(intervalMs, signal);
    }

    throw new Error('HH job timed out waiting for worker');
}
