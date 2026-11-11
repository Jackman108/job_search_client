import type { AxiosError, AxiosInstance } from 'axios';
import { shouldRedirectToServerUnavailable } from './serverUnavailableRedirect';

const isJobsPollUrl = (url: unknown): boolean =>
    typeof url === 'string' && (url.includes('/jobs/') || url.endsWith('/jobs'));

/**
 * Redirect to /server-error only for real network/5xx failures.
 * Never redirect HH job poll failures — those surface as job error/captcha/login messages.
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
            if (isJobsPollUrl(error.config?.url)) {
                return Promise.reject(error);
            }

            if (shouldRedirectToServerUnavailable(error) && window.location.pathname !== redirectPath) {
                const now = Date.now();
                if (now - lastRedirect > throttleMs) {
                    lastRedirect = now;
                    window.location.href = redirectPath;
                }
            }
            return Promise.reject(error);
        },
    );
}
