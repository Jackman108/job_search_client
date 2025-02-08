// src/hooks/useFetchAuth.ts
import {useCallback, useState} from 'react';
import {AuthResponse, RegisterResponse} from '../../Interfaces/InterfaceAuth.types';
import {useAuth} from '../../context/useAuthContext';
import {decodeToken, isTokenExpired} from '../../utils/tokenUtils';
import {handleAuthError} from '../../utils/errorHandler';
import useAuthApi from "../../api/useAuthApi";

const useFetchAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {setToken, setRefreshToken} = useAuth();
    const {request} = useAuthApi();

    const refreshAuthToken = useCallback(async () => {
        try {
            const response = await request('get', '/auth/refresh-tokens', undefined, {withCredentials: true});
            setToken(response.data.accessToken);
        } catch (err) {
            handleAuthError(setError, err);
        }
    }, [request, setToken]);

    const handleAuthRequest = useCallback(async (action: () => Promise<any>) => {
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            await action();
        } catch (err) {
            handleAuthError(setError, err);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    const login = useCallback(async (email: string, password: string) => {
        await handleAuthRequest(async () => {

            const response = await request<AuthResponse>(
                'post',
                '/auth/login',
                {email, password},
                {withCredentials: false}
            );
            const refreshToken = response.headers['x-refresh-token'];

            if (refreshToken) setRefreshToken(refreshToken);

            if (isTokenExpired(decodeToken(response.data.accessToken).exp)) {
                await refreshAuthToken();
                return;
            }

            setToken(response.data.accessToken);
        });
    }, [handleAuthRequest, request, setToken, setRefreshToken, refreshAuthToken]);

    const register = useCallback(async (email: string, password: string, passwordRepeat: string) => {
        if (password !== passwordRepeat) {
            handleAuthError(setError, 'Passwords do not match');
            setLoading(false);
            return;
        }

        await handleAuthRequest(async () => {
            await request<RegisterResponse>(
                'post',
                '/auth/register',
                {email, password, passwordRepeat},
                {withCredentials: false}
            );

            const response = await request<AuthResponse>(
                'post',
                '/auth/login',
                {email, password},
                {withCredentials: false}
            );

            setToken(response.data.accessToken);
        });

    }, [handleAuthRequest, request, setToken]);

    const logout = useCallback(async () => {
        await handleAuthRequest(async () => {

            await request(
                'get',
                '/auth/logout',
                undefined,
                {withCredentials: true}
            );
            setToken(null);

        });
    }, [handleAuthRequest, request, setToken]);

    return {request, login, register, logout, loading, error};
};

export default useFetchAuth;
