import { FormEvent } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import useFeedbackSubmit from './useFeedbackSubmit';
import useSharedSearchProfile, { HH_CREDENTIAL_KEYS } from '@shared/hooks/forms/useSharedSearchProfile';

const useFeedbackLogic = () => {
    const { token } = useAuth();
    const { feedbackSubmit, feedbackStop } = useFeedbackSubmit();
    const profile = useSharedSearchProfile(HH_CREDENTIAL_KEYS);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await feedbackSubmit({
            ...profile.formValues,
            token,
            setErrors: profile.setErrors,
            setIsLoading: profile.setIsLoading,
        });
    };

    const onStop = async () => {
        await feedbackStop();
        profile.setIsLoading(false);
    };

    return {
        token,
        ...profile,
        onSubmit,
        onStop,
    };
};

export default useFeedbackLogic;
