import { isHhQueueResponse, pollHhJobUntilSettled } from './pollHhJob';
import type { HhJobStatusResponse } from '../types/HhJob.types';

type RequestFn = Parameters<typeof pollHhJobUntilSettled>[0];

const asRequestFn = (impl: () => HhJobStatusResponse): { request: RequestFn; mock: jest.Mock } => {
    const mock = jest.fn(async <T = unknown>(): Promise<T> => impl() as T);
    return { request: mock as RequestFn, mock };
};

describe('pollHhJob', () => {
    it('detects queue response shape', () => {
        expect(isHhQueueResponse({ jobId: 'abc' })).toBe(true);
        expect(isHhQueueResponse({ jobId: 1 })).toBe(false);
        expect(isHhQueueResponse(null)).toBe(false);
    });

    it('resolves when job is done', async () => {
        const statuses: HhJobStatusResponse[] = [
            {
                id: 'j1',
                status: 'running',
                kind: 'sendFeedback',
                createdAt: '2026-01-01T00:00:00.000Z',
            },
            {
                id: 'j1',
                status: 'done',
                kind: 'sendFeedback',
                createdAt: '2026-01-01T00:00:00.000Z',
            },
        ];
        let i = 0;
        const { request, mock } = asRequestFn(() => statuses[i++]);
        const result = await pollHhJobUntilSettled(request, 'j1', { intervalMs: 1, timeoutMs: 1000 });
        expect(result.status).toBe('done');
        expect(mock).toHaveBeenCalled();
    });

    it('resolves on error status so callers can read summary', async () => {
        const { request } = asRequestFn(() => ({
            id: 'j1',
            status: 'error',
            kind: 'sendFeedback',
            createdAt: '2026-01-01T00:00:00.000Z',
            error: 'CAPTCHA',
            summary: { success: 1, skipped: 2, failed: 1, pages: 1 },
        }));
        const result = await pollHhJobUntilSettled(request, 'j1', { intervalMs: 1, timeoutMs: 500 });
        expect(result.status).toBe('error');
        expect(result.summary?.success).toBe(1);
    });

    it('aborts when signal is aborted', async () => {
        const { request } = asRequestFn(() => ({
            id: 'j1',
            status: 'running',
            kind: 'sendFeedback',
            createdAt: '2026-01-01T00:00:00.000Z',
        }));
        const ac = new AbortController();
        const pending = pollHhJobUntilSettled(request, 'j1', { intervalMs: 50, timeoutMs: 5000, signal: ac.signal });
        ac.abort();
        await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
    });
});
