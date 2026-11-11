import { FormEvent } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import useVacancySubmit from './useVacancySubmit';
import useSharedSearchProfile, { PROFILE_REQUIRED_KEYS } from '@shared/hooks/forms/useSharedSearchProfile';

const useSearchFormLogic = () => {
    const { token } = useAuth();
    const { vacancySubmit, vacancyStop } = useVacancySubmit();
    const profile = useSharedSearchProfile(PROFILE_REQUIRED_KEYS);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await vacancySubmit({
            ...profile.formValues,
            token,
            setErrors: profile.setErrors,
            setIsLoading: profile.setIsLoading,
        });
    };

    const onStop = async () => {
        await vacancyStop();
        profile.setIsLoading(false);
    };

    return {
        token,
        ...profile,
        onSubmit,
        onStop,
    };
};

export default useSearchFormLogic;
