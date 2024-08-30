// src/contexts/AuthProvider.tsx
import { FC, ReactNode, useEffect, useState } from 'react';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';
import AuthContext from './useAuthContext';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
        const savedProfile = localStorage.getItem('userProfile');
        return savedProfile ? JSON.parse(savedProfile) : null;
    });

    useEffect(() => {
        if (userId) localStorage.setItem('userId', userId);
        else localStorage.removeItem('userId');
    }, [userId]);

    useEffect(() => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);

    useEffect(() => {
        if (userProfile) localStorage.setItem('userProfile', JSON.stringify(userProfile));
        else localStorage.removeItem('userProfile');
    }, [userProfile]);

    const logout = () => {
        setUserId(null);
        setToken(null);
        setUserProfile(null);
    };

    return (
        <AuthContext.Provider value={{ userId, token, userProfile, setUserId, setToken, setUserProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
