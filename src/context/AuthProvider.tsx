// src/contexts/AuthProvider.tsx
import {FC, ReactNode, useEffect, useState} from 'react';
import AuthContext from './useAuthContext';

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);

    return (
        <AuthContext.Provider value={{token, isLoading, setToken, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    );
};
