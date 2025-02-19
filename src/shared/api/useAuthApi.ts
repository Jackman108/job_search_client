import axios, {AxiosResponse} from 'axios';
import {AUTH_URL} from '@config/serverConfig';
import {useAuth} from '@app/providers/auth/useAuthContext';

const axiosAuthInstance = axios.create({
    baseURL: AUTH_URL,
    withCredentials: true,
});

const useAuthApi = () => {
    const {token} = useAuth();

    const request = async <T = any>(
        method: 'get' | 'post',
        endpoint: string,
        data?: any,
        config = {}
    ): Promise<AxiosResponse<T>> => {
        return axiosAuthInstance.request({
            method,
            url: endpoint,
            data,
            headers: token ? {Authorization: `Bearer ${token}`} : {},
            ...config,
        });
    };

    return {request};
};

export default useAuthApi;
