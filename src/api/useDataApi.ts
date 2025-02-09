import axios from 'axios';
import {useCallback} from 'react';
import {API_URL} from '../config/serverConfig';
import {useAuth} from '../context/useAuthContext';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const useDataApi = () => {
    const {token} = useAuth();

    const request = useCallback(
        async <T = any>(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, data?: any): Promise<T> => {

            if (!token) throw new Error('Токен отсутствует');

            const response = await axiosInstance.request({
                method,
                url: endpoint,
                data,
                headers: {Authorization: token},
            });
            return response.data;
        },
        [token]
    );

    return {request};
};

export default useDataApi;
