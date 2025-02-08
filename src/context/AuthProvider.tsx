// src/contexts/AuthProvider.tsx
import {FC, ReactNode, useEffect, useState} from 'react';
import AuthContext from './useAuthContext';

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);

    useEffect(() => {
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
        else localStorage.removeItem('refreshToken');
    }, [refreshToken]);

    return (
        <AuthContext.Provider value={{token, refreshToken, isLoading, setToken, setRefreshToken, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    );
};
