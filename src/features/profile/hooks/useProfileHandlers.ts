import {useCallback, useEffect} from 'react';
import {UseProfileHandlers} from '../types/InterfaceProfile.types';
import {useAuth} from '@app/providers/auth/useAuthContext';
import useFetchProfile from './useFetchProfile';

export const useProfileHandlers = (): UseProfileHandlers => {
    const {token} = useAuth();
    const {queryClient, fetchUserProfile, userProfile, setUserProfile} = useFetchProfile();

    useEffect(() => {
        if (token) {
            fetchUserProfile().catch((error) => console.error('Profile fetch error', error));
        } else {
            queryClient.removeQueries({queryKey: ['userProfile']});
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
