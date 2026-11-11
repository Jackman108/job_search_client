import axios, { AxiosResponse } from 'axios';
import { AUTH_URL } from '@config';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { setupNetworkErrorInterceptor } from '@shared/utils/axiosInterceptors';
import { toBearerAuthorization } from '@shared/utils/toBearerAuthorization';

const axiosAuthInstance = axios.create({
    baseURL: AUTH_URL,
    withCredentials: true,
});

// Устанавливаем глобальный перехватчик сетевых ошибок для аутентификации
setupNetworkErrorInterceptor(axiosAuthInstance);

export const useAuthApi = () => {
    const { token } = useAuth();

    const request = async <T = any>(
        method: 'get' | 'post',
        endpoint: string,
        data?: any,
        config = {},
    ): Promise<AxiosResponse<T>> => {
        return axiosAuthInstance.request({
            method,
            url: endpoint,
            data,
            headers: token ? { Authorization: toBearerAuthorization(token) } : {},
            ...config,
        });
    };

    return { request };
};
