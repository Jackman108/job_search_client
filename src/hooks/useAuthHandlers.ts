import {useCallback, useState} from 'react';
import {useAuth} from '../context/useAuthContext';
import useFetchAuth from './fetch/useFetchAuth';
import {validateEmail, validatePassword} from '../utils/validateUtils';
import {getErrorValidate} from '../utils/errorHandler';

export const useAuthHandlers = () => {
    const {login, register, logout, isLoading: authLoading, error: authError} = useFetchAuth();
    const {token} = useAuth();

    const [isSign, setIsSign] = useState<boolean>(!!token);
    const [formError, setFormError] = useState<string | null>(null);

    const validateCredentials = (email: string, password: string, passwordRepeat?: string) => {
        const {isValidEmail, emailError} = validateEmail(email);
        const {isValidPassword, passwordError} = validatePassword(password);

        if (!isValidEmail || !isValidPassword) {
            setFormError(getErrorValidate(emailError?.email, passwordError?.password));
            return false;
        }

        if (passwordRepeat && password !== passwordRepeat) {
            setFormError('Пароли не совпадают');
            return false;
        }

        return true;
    };

    const handleSignIn = useCallback(async (email: string, password: string) => {
        setFormError(null);
        if (!validateCredentials(email, password)) return;

        try {
            await login({email, password});
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Ошибка при входе');
        }
    }, [login]);

    const handleRegister = useCallback(async (email: string, password: string, passwordRepeat: string) => {
        setFormError(null);
        if (!validateCredentials(email, password, passwordRepeat)) return;

        try {
            await register({email, password, passwordRepeat});
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Ошибка при регистрации');
        }
    }, [register]);

    const handleSignOut = useCallback(async () => {
        setFormError(null);
        try {
            await logout();
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Ошибка при выходе');
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
        formError,
    };
};
