import AuthContext from './useAuthContext';
import {useLocalStorage} from "@hooks";
import {AppProvidersProps} from "@app/types/AppProviders.props";
import { useEffect } from 'react';
import { decodeToken, isTokenExpired } from '@utils';

const AuthProvider = ({children}: AppProvidersProps) => {
    const [token, setToken] = useLocalStorage<string | null>('token', null);

    // При монтировании проверяем срок жизни токена и очищаем при истечении
    useEffect(() => {
        if (token) {
            try {
                const { exp } = decodeToken(token);
                if (isTokenExpired(exp)) {
                    setToken(null);
                }
            } catch {
                setToken(null);
            }
        }
    }, [token, setToken]);

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;