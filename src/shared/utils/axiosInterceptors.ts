import { AxiosInstance } from 'axios';

/**
 * Устанавливает глобальный перехватчик для сетевых ошибок.
 * При отсутствии ответа от сервера перенаправляет на указанный путь не чаще, чем throttleMs.
 */
export function setupNetworkErrorInterceptor(
    instance: AxiosInstance,
    redirectPath: string = '/server-error',
    throttleMs: number = 10000
): void {
    let lastRedirect = 0;
    instance.interceptors.response.use(
        response => response,
        error => {
            if (!error.response && window.location.pathname !== redirectPath) {
                const now = Date.now();
                if (now - lastRedirect > throttleMs) {
                    lastRedirect = now;
                    window.location.href = redirectPath;
                }
            }
            return Promise.reject(error);
        }
    );
} 