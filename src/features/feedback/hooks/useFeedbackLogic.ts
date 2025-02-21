import {useAuth} from '@app/providers/auth/useAuthContext';
import {useSearchFormContext} from '@app/providers/search/useSearchFormContext';
import useFeedbackSubmit from './useFeedbackSubmit';
import {FormEvent} from "react";
import useAuthManagement from "@hooks/forms/useAuthManagement";
import useSearchAuth from "@hooks/forms/useSearchAuth";
import useSearchFormState from "@hooks/forms/useSearchFormState";

const useFeedbackLogic = () => {
    const {token} = useAuth();
    const {feedbackSubmit, feedbackStop} = useFeedbackSubmit();
    const {isLoading, setIsLoading, selectedAuthId, setSelectedAuthId,} = useSearchFormContext();
    const {auths: searchAuths} = useSearchAuth();

    const {formValues, errors, setErrors, handleInputChange} = useSearchFormState(
        searchAuths?.find(v => v.id === selectedAuthId) || null
    );

    const {handleCreateAuth, handleUpdateAuth, handleDeleteAuth} = useAuthManagement(formValues);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await feedbackSubmit({
            ...formValues,
            token,
            setErrors,
            setIsLoading,
        });
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
        onStop: feedbackStop,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    };
};

export default useFeedbackLogic;