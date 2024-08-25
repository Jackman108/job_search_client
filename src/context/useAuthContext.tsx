// src/contexts/useAuthContext.tsx
import { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import { AuthContextProps } from '../Interfaces/InterfaceAuth.types';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

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

    useEffect(() => {
        if (userProfile) {
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        } else {
            localStorage.removeItem('userProfile');
        }
    }, [userProfile]);
    return (
        <AuthContext.Provider value={{ userId, token, userProfile, setUserId, setToken, setUserProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
