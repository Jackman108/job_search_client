// src/hooks/useFetchAuth.ts
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AuthResponse, RegisterResponse} from '../../Interfaces/InterfaceAuth.types';
import {useAuth} from '../../context/useAuthContext';
import {decodeToken, isTokenExpired} from '../../utils/tokenUtils';
import {handleAuthError} from '../../utils/errorHandler';
import useAuthApi from '../../api/useAuthApi';
import {AxiosResponse} from "axios";

const useFetchAuth = () => {
    const queryClient = useQueryClient();
    const {setToken} = useAuth();
    const {request} = useAuthApi();

    const refreshAuthToken = useMutation<string, Error>(
        {
            mutationFn: async () => {
                const response = await request('get', '/auth/refresh-tokens', undefined, {withCredentials: true});
                return response.data.accessToken;
            },
            onSuccess: (token: string) => {
                setToken(token);
            },
            onError: (err: Error) => {
                const errorMessage = handleAuthError(err);
                throw new Error(errorMessage);
            },
        }
    );

    const login = useMutation<AxiosResponse<AuthResponse>, Error, { email: string; password: string }>(
        {
            mutationFn: async ({email, password}: { email: string; password: string }) => {
                return await request<AuthResponse>('post', '/auth/login', {email, password}, {withCredentials: false});
            },
            onSuccess: (response: AxiosResponse<AuthResponse>) => {

                if (isTokenExpired(decodeToken(response.data.accessToken).exp)) {
                    refreshAuthToken.mutate();
                    return;
                }

                setToken(response.data.accessToken);
            },
            onError: (err: Error) => {
                const errorMessage = handleAuthError(err);
                throw new Error(errorMessage);
            },
        }
    );

    const register = useMutation<AxiosResponse<AuthResponse>, Error, {
        email: string;
        password: string;
        passwordRepeat: string
    }>(
        {
            mutationFn: async ({email, password, passwordRepeat}: {
                email: string;
                password: string;
                passwordRepeat: string
            }) => {
                if (password !== passwordRepeat) {
                    throw new Error('Passwords do not match');
                }

                await request<RegisterResponse>('post', '/auth/register', {
                    email,
                    password,
                    passwordRepeat
                }, {withCredentials: false});
                return await request<AuthResponse>('post', '/auth/login', {email, password}, {withCredentials: false});
            },
            onSuccess: (response: AxiosResponse<AuthResponse>) => {
                setToken(response.data.accessToken);
            },
            onError: (err: Error) => {
                const errorMessage = handleAuthError(err);
                throw new Error(errorMessage);
            },
        }
    );

    const logout = useMutation<void, Error>(
        {
            mutationFn: async () => {
                await request('get', '/auth/logout', undefined, {withCredentials: true});
            },
            onSuccess: () => {
                setToken(null);
                queryClient.clear();
            },
            onError: (err: Error) => {
                const errorMessage = handleAuthError(err);
                throw new Error(errorMessage);
            },
        }
    );

    return {
        login: login.mutateAsync,
        register: register.mutateAsync,
        logout: logout.mutateAsync,
        isLoading: login.isPending || register.isPending || logout.isPending,
        error: login.error || register.error || logout.error,
    };
};

export default useFetchAuth;