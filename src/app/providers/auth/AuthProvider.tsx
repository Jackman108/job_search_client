import AuthContext from './useAuthContext';
import {useLocalStorage} from "@hooks";
import {AppProvidersProps} from "@app/types/AppProviders.props";

const AuthProvider = ({children}: AppProvidersProps) => {
    const [token, setToken] = useLocalStorage<string | null>('token', null);

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;