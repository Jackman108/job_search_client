import AuthContext from './useAuthContext';
import { useLocalStorage } from '@hooks';
import { AppProvidersProps } from '@app/types/AppProviders.props';
import useExpiredTokenRefresh from './useExpiredTokenRefresh';

const AuthProvider = ({ children }: AppProvidersProps) => {
    const [token, setToken] = useLocalStorage<string | null>('token', null);

    // Истёкший access (JWT_EXP ~5m): сначала refresh по cookie, очистка — только если refresh не удался.
    useExpiredTokenRefresh(token, setToken);

    return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
