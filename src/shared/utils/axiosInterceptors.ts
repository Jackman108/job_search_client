import type { AxiosError, AxiosInstance } from 'axios';
import { API_URL } from '@config';
import { shouldRedirectToServerUnavailable } from './serverUnavailableRedirect';
import { probeBackendHealth } from './probeBackendHealth';

const isJobsPollUrl = (url: unknown): boolean =>
    typeof url === 'string' && (url.includes('/jobs/') || url.endsWith('/jobs'));

/** Payment schema drift must not hard-redirect the whole app away from search. */
const isPaymentUrl = (url: unknown): boolean =>
    typeof url === 'string' && (url.includes('/payment') || url.includes('/payments'));

/**
 * Redirect to /server-error only for real network/5xx failures.
 * Never redirect HH job poll or payment list failures — those stay in-panel.
 * If /health is already OK, skip the error page (caller stays on the current route).
 */
export function setupNetworkErrorInterceptor(
    instance: AxiosInstance,
    redirectPath: string = '/server-error',
    throttleMs: number = 10000,
): void {
    let lastRedirect = 0;
    instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            const url = error.config?.url;
            if (isJobsPollUrl(url) || isPaymentUrl(url)) {
                return Promise.reject(error);
            }

            if (shouldRedirectToServerUnavailable(error) && window.location.pathname !== redirectPath) {
                const now = Date.now();
                if (now - lastRedirect > throttleMs) {
                    lastRedirect = now;
                    void probeBackendHealth(API_URL).then((healthy) => {
                        if (healthy) return;
                        if (window.location.pathname !== redirectPath) {
                            window.location.href = redirectPath;
                        }
                    });
                }
            }
            return Promise.reject(error);
        },
    );
}
