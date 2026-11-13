/**
 * Liveness probe against backend GET /health.
 * Used by /server-error to bounce home when the API is actually up
 * (false alarm after a transient 5xx / race).
 */
export async function probeBackendHealth(baseUrl: string, timeoutMs = 2500): Promise<boolean> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(`${baseUrl.replace(/\/$/, '')}/health`, {
            method: 'GET',
            cache: 'no-store',
            signal: controller.signal,
        });
        return res.ok;
    } catch {
        return false;
    } finally {
        clearTimeout(timer);
    }
}
