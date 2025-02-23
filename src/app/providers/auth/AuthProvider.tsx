import {FC, ReactNode} from 'react';
import AuthContext from './useAuthContext';
import useLocalStorage from "@hooks/useLocalStorage";

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [token, setToken] = useLocalStorage<string | null>('token', null);

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
};
