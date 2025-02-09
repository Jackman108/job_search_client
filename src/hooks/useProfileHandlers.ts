import {useCallback, useEffect} from 'react';
import {UseProfileHandlers} from '../Interfaces/InterfaceProfile.types';
import {useAuth} from '../context/useAuthContext';
import useFetchUserProfile from './fetch/useFetchUserProfile';

export const useProfileHandlers = (): UseProfileHandlers => {
    const {token} = useAuth();
    const {fetchUserProfile, userProfile, setUserProfile} = useFetchUserProfile();

    useEffect(() => {
        if (token) {
            fetchUserProfile().catch((error) => console.error('Profile fetch error', error));
        } else {
            setUserProfile(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

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
