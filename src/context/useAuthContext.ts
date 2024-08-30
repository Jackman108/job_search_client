// src/contexts/useAuthContext.ts
import { createContext, useContext } from 'react';
import { AuthContextProps } from '../Interfaces/InterfaceAuth.types';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export default AuthContext;