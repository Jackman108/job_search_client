import axios, {AxiosResponse} from 'axios';
import {useCallback, useState} from 'react';
import {AUTH_URL} from '../config/serverConfig';
import {useAuth} from '../context/useAuthContext';

const axiosAuthInstance = axios.create({
    baseURL: AUTH_URL,
    withCredentials: true,
});

const useAuthApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {token} = useAuth();

    const request = useCallback(
        async <T = any>(method: 'get' | 'post', endpoint: string, data?: any, config = {}): Promise<AxiosResponse<T>> => {
            setLoading(true);
            setError(null);

            try {
                return await axiosAuthInstance.request({
                    method,
                    url: endpoint,
                    data,
                    headers: token ? {Authorization: `Bearer ${token}`} : {},
                    ...config,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [token]
    );

    return {loading, error, request};
};

export default useAuthApi;
