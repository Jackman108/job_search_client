// src/contexts/useAuthContext.tsx
import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { AuthContextProps } from '../Interfaces/InterfaceAuth.types';


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ userId, token, setUserId, setToken }}>
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
