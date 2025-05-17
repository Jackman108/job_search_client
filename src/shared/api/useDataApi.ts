import axios from 'axios';
import { useCallback } from 'react';
import { API_URL } from '@config';
import { useAuth } from '@app/providers/auth/useAuthContext';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const useDataApi = () => {
    const { token } = useAuth();

    const request = useCallback(
        async <T = any>(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, data?: any): Promise<T> => {

            // Проверяем наличие токена авторизации
            if (!token) throw new Error('Token is missing');

            const response = await axiosInstance.request({
                method,
                url: endpoint,
                data,
                headers: { Authorization: token },
            });
            return response.data;
        },
        [token]
    );

    return { request };
};