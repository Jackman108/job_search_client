import { useCallback, useEffect } from 'react';
import { UseProfileHandlers } from '../Interfaces/InterfaceProfile.types';
import { useAuth } from '../context/useAuthContext';
import useFetchUserProfile from '../hooks/useFetchUserProfile';

export const useProfileHandlers = (): UseProfileHandlers => {
    const { token } = useAuth();
    const { fetchUserProfile, userProfile, setUserProfile } = useFetchUserProfile();

    useEffect(() => {
        if (token) {
            fetchUserProfile();
        } else {
            setUserProfile(null);
        }
    }, [token, fetchUserProfile, setUserProfile]);

    const handleUpdateProfile = useCallback(async (): Promise<void> => {
        try {
            await fetchUserProfile();
        } catch (error) {
            console.error('Profile update error');
        }
    }, [fetchUserProfile]);



    return {
        userProfile,
        handleUpdateProfile,
    };
};
