import axios from 'axios';
import { useCallback } from 'react';
import { API_URL } from '@config';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { setupNetworkErrorInterceptor } from '@shared/utils/axiosInterceptors';
import { toBearerAuthorization } from '@shared/utils/toBearerAuthorization';
import { shouldRefreshAfterUnauthorized } from '@shared/utils/tokenRefresh.utils';
import { refreshAccessToken } from './refreshAccessToken';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Устанавливаем глобальный перехватчик сетевых ошибок
setupNetworkErrorInterceptor(axiosInstance);

type Method = 'get' | 'post' | 'put' | 'delete';

const send = (method: Method, url: string, data: unknown, token: string) =>
    axiosInstance.request({
        method,
        url,
        data,
        headers: { Authorization: toBearerAuthorization(token) },
    });

export const useDataApi = () => {
    const { token, setToken } = useAuth();

    const request = useCallback(
        async <T = any>(method: Method, endpoint: string, data?: any): Promise<T> => {
            // Проверяем наличие токена авторизации
            if (!token) throw new Error('Token is missing');

            try {
                return (await send(method, endpoint, data, token)).data;
            } catch (error) {
                const status = axios.isAxiosError(error) ? error.response?.status : undefined;
                // Access JWT is short-lived: on 401 refresh once and retry once (no loops).
                if (!shouldRefreshAfterUnauthorized(status, false)) throw error;

                const fresh = await refreshAccessToken();
                if (!fresh) throw error;
                setToken(fresh);
                return (await send(method, endpoint, data, fresh)).data;
            }
        },
        [token, setToken],
    );

    return { request };
};
