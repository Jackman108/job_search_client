import {useCallback, useEffect} from 'react';
import {useFetchByType} from "@api";
import {profileConfig} from "@entities/profile/config/profileConfig";
import {UserProfile} from "@entities/profile";
import {useAuth} from '@app/providers/auth/useAuthContext';
import {UseProfileHandlersProps} from "@features/profile/props/Profile.props";

export const useProfile = (): UseProfileHandlersProps => {
    const {token} = useAuth();
    const {
        fetchedData,
        loading: profileLoading,
        error: profileError,
        loadData: fetchProfile,
    } = useFetchByType(profileConfig);

    useEffect(() => {
        if (token) fetchProfile().catch((error) => console.error('Profile fetch error', error));
    }, [token, fetchProfile]);

    const handleUpdateProfile = useCallback(async (): Promise<void> => {
        try {
            await fetchProfile();
        } catch (error) {
            console.error('Profile update error');
        }
    }, [fetchProfile]);

    return {
        userProfile: fetchedData?.profile as UserProfile || null,
        profileLoading,
        profileError,
        handleUpdateProfile,
    };
};
