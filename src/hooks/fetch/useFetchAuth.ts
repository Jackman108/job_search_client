// src/hooks/useFetchAuth.ts
import axios from 'axios';
import {useCallback, useState} from 'react';
import {AuthResponse, RegisterResponse} from '../../Interfaces/InterfaceAuth.types';
import {AUTH_URL} from '../../config/serverConfig';
import {useAuth} from '../../context/useAuthContext';
import {decodeToken, isTokenExpired} from '../../utils/tokenUtils';
import {handleAuthError} from '../../utils/errorHandler';

const useFetchAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {token, setUserId, setToken} = useAuth();

    const refreshAuthToken = useCallback(async () => {
        try {
            const {data} = await axios.get(`${AUTH_URL}/auth/refresh-tokens`, {
                withCredentials: true,
            });
            const {accessToken} = data;
            setToken(accessToken);
        } catch (err) {
            handleAuthError(setError, err);
        }
    }, [setToken]);


    const login = useCallback(async (email: string, password: string) => {
        if (loading) return;
        setLoading(true);
        setError(null);

        try {
            const {data} = await axios.post<AuthResponse>(`${AUTH_URL}/auth/login`, {email, password});
            const {accessToken} = data;
            const decodedToken = decodeToken(accessToken);

            if (isTokenExpired(decodedToken.exp)) {
                await refreshAuthToken();
                return;
            }

            setToken(accessToken);
            setUserId(decodedToken.id);

        } catch (err) {
            handleAuthError(setError, err);
        } finally {
            setLoading(false);
        }
    }, [loading, setUserId, setToken, refreshAuthToken]);

    const register = useCallback(async (email: string, password: string, passwordRepeat: string) => {
        if (loading) return;
        setLoading(true);
        setError(null);

        if (password !== passwordRepeat) {
            handleAuthError(setError, 'Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const {data} = await axios.post<RegisterResponse>(`${AUTH_URL}/auth/register`, {
                email, password, passwordRepeat
            });
            setUserId(data.id)


            const loginResponse = await axios.post<AuthResponse>(`${AUTH_URL}/auth/login`, {
                email,
                password,
            });

            const {accessToken} = loginResponse.data;
            setToken(accessToken);

        } catch (err) {
            handleAuthError(setError, err);
        } finally {
            setLoading(false);
        }
    }, [loading, setUserId, setToken,]);

    const logout = useCallback(async () => {
        if (loading) return;
        setUserId(null);
        setLoading(true);
        try {
            await axios.get(`${AUTH_URL}/auth/logout`, {
                withCredentials: true,
                headers: {
                    Authorization: token,
                },
            });
        } catch (err) {
            setError('Logout error');
        } finally {
            setLoading(false);
            setToken(null);
        }
    }, [token, loading, setToken, setUserId]);

    return {login, register, logout, loading, error};
};

export default useFetchAuth;
