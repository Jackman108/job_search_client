import { isHhQueueResponse, pollHhJobUntilSettled } from './pollHhJob';
import type { HhJobStatusResponse } from '../types/HhJob.types';

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
        const request = jest.fn(async () => statuses[i++]);
        const result = await pollHhJobUntilSettled(request, 'j1', { intervalMs: 1, timeoutMs: 1000 });
        expect(result.status).toBe('done');
        expect(request).toHaveBeenCalled();
    });

    it('throws on error status with detail', async () => {
        const request = jest.fn(async () => ({
            id: 'j1',
            status: 'error' as const,
            kind: 'sendFeedback' as const,
            createdAt: '2026-01-01T00:00:00.000Z',
            error: 'CAPTCHA',
        }));
        await expect(pollHhJobUntilSettled(request, 'j1', { intervalMs: 1, timeoutMs: 500 })).rejects.toThrow(
            'CAPTCHA',
        );
    });
});
