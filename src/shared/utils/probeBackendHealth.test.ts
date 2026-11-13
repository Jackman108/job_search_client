import { probeBackendHealth } from './probeBackendHealth';

describe('probeBackendHealth', () => {
    const originalFetch = global.fetch;

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('returns true when /health responds ok', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: true });
        await expect(probeBackendHealth('http://localhost:8000', 500)).resolves.toBe(true);
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:8000/health',
            expect.objectContaining({ method: 'GET' }),
        );
    });

    it('returns false when /health is down or throws', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('network'));
        await expect(probeBackendHealth('http://localhost:8000', 500)).resolves.toBe(false);
    });
});
