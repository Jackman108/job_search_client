import type { HhJobStatusResponse, HhQueueResponse } from '../types/HhJob.types';

const DEFAULT_INTERVAL_MS = 2000;
const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

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
    const started = Date.now();

    while (Date.now() - started < timeoutMs) {
        const status = await request<HhJobStatusResponse>('get', `/jobs/${jobId}`);
        options?.onUpdate?.(status);

        if (status.status === 'done') {
            return status;
        }
        if (status.status === 'error' || status.status === 'cancelled') {
            // Prefer job file fields; caller formats for UI (not server-unavailable).
            const detail =
                status.error ||
                status.lastEvent ||
                (status.captchaSrc ? `CAPTCHA detected restart ${status.captchaSrc}` : undefined) ||
                'HH job failed';
            throw new Error(detail);
        }
        await sleep(intervalMs);
    }

    throw new Error('HH job timed out waiting for worker');
}
