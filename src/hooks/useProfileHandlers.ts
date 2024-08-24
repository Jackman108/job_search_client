import { useState, useCallback, useEffect } from 'react';
import useFetchAuth from '../hooks/useFetchAuth';
import useFetchUserProfile from '../hooks/useFetchUserProfile';
import { UseProfileHandlers } from '../Interfaces/InterfaceProfile.types';

export const useProfileHandlers = (): UseProfileHandlers => {
    const { login, register, logout, error: authError, loading: authLoading } = useFetchAuth();
    const { userProfile, fetchUserProfile, error: profileError } = useFetchUserProfile();

    const [isSign, setIsSign] = useState<boolean>(!!userProfile);
    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        if (!userProfile) {
            fetchUserProfile();
        }
    }, [userProfile, fetchUserProfile]);

    const handleSignIn = useCallback(async (email: string, password: string) => {
        setFormError(null);
        try {
            await login(email, password);
        } catch {
            setFormError('Ошибка при входе: неверный email или пароль');
        }
    }, [login]);

    const handleRegister = useCallback(async (email: string, password: string, passwordRepeat: string) => {
        setFormError(null);
        try {
            await register(email, password, passwordRepeat);
        } catch {
            setFormError('Ошибка при регистрации: проверьте правильность введенных данных');
        }
    }, [register]);

    const handleSignOut = useCallback(() => {
        logout();
        setFormError(null);
    }, [logout]);

    const handleUpdateProfile = useCallback(async () => {
        try {
            await fetchUserProfile();
        } catch {
            setFormError('Ошибка обновления профиля');
        }
    }, [fetchUserProfile]);

    useEffect(() => {
        if (profileError) {
            setFormError(profileError);
        } else if (authError) {
            setFormError(authError);
        }
    }, [profileError, authError]);

    return {
        userProfile,
        isSign,
        setIsSign,
        formError,
        handleSignIn,
        handleRegister,
        handleSignOut,
        handleUpdateProfile,
        authLoading,
        authError,
    };
};
