import { useAuth } from '@app/providers/auth/useAuthContext';
import { useSearchFormContext } from '@app/providers/search/useSearchFormContext';
import useFeedbackSubmit from './useFeedbackSubmit';
import { FormEvent } from 'react';
import { useAuthManagement, useSearchAuth, useSearchFormState } from '@hooks';
import useClearStaleProfileSelection from '@shared/hooks/forms/useClearStaleProfileSelection';

const useFeedbackLogic = () => {
    const { token } = useAuth();
    const { feedbackSubmit, feedbackStop } = useFeedbackSubmit();
    const { isLoading, setIsLoading, selectedAuthId, setSelectedAuthId } = useSearchFormContext();
    const { auths: searchAuths } = useSearchAuth();

    useClearStaleProfileSelection(searchAuths, selectedAuthId, setSelectedAuthId);

    const { formValues, errors, setErrors, handleInputChange, resetAuthToBlank } = useSearchFormState(
        searchAuths?.find((v) => v.id === selectedAuthId) || null,
    );

    const { handleStartCreateAuth, handleCreateAuth, handleUpdateAuth, handleDeleteAuth } = useAuthManagement(
        formValues,
        resetAuthToBlank,
    );

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await feedbackSubmit({
            ...formValues,
            token,
            setErrors,
            setIsLoading,
        });
    };
    const onStop = async () => {
        await feedbackStop();
        setIsLoading(false);
    };

    return {
        token,
        isLoading,
        errors,
        formValues,
        searchAuths,
        selectedAuthId,
        setSelectedAuthId,
        handleInputChange,
        onSubmit,
        onStop,
        handleStartCreateAuth,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    };
};

export default useFeedbackLogic;
