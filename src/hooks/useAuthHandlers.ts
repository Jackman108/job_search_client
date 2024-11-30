import {useCallback, useState} from 'react';
import {useAuth} from '../context/useAuthContext';
import useFetchAuth from '../hooks/useFetchAuth';
import {validateEmail, validatePassword} from '../utils/validateUtils';
import {getErrorValidate} from '../utils/errorHandler';

export const useAuthHandlers = () => {
    const {login, register, logout, error: authError, loading: authLoading} = useFetchAuth();
    const {token} = useAuth();

    const [isSign, setIsSign] = useState<boolean>(!!token);
    const [, setFormError] = useState<string | null>(null);

    const handleSignIn = useCallback(async (email: string, password: string) => {
        setFormError(null);

        const {isValidEmail, emailError} = validateEmail(email);
        const {isValidPassword, passwordError} = validatePassword(password);

        if (!isValidEmail || !isValidPassword) {
            setFormError(getErrorValidate(emailError?.email, passwordError?.password));
            return;
        }

        try {
            await login(email, password);
        } catch {
            setFormError('Login error: invalid email or password');
        }
    }, [login]);

    const handleRegister = useCallback(async (email: string, password: string, passwordRepeat: string) => {
        setFormError(null);

        const {isValidEmail, emailError} = validateEmail(email);
        const {isValidPassword, passwordError} = validatePassword(password);

        if (!isValidEmail || !isValidPassword) {
            setFormError(getErrorValidate(emailError?.email, passwordError?.password));
            return;
        }

        if (password !== passwordRepeat) {
            setFormError('Пароли не совпадают');
            return;
        }

        try {
            await register(email, password, passwordRepeat);
        } catch {
            setFormError('Registration error: check if the data entered is correct');
        }
    }, [register]);

    const handleSignOut = useCallback(async () => {
        setFormError(null);

        try {
            await logout();
        } catch {
            setFormError('Exit error');
        }
    }, [logout]);

    return {
        isSign,
        setIsSign,
        handleSignIn,
        handleRegister,
        handleSignOut,
        authLoading,
        authError,
    };
};
