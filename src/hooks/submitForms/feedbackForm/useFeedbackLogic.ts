import {useAuth} from '../../../context/useAuthContext';
import {useSearchFormContext} from '../../../context/SearchFormContext';
import useSearchFormState from '../useSearchFormState';
import useFeedbackSubmit from './useFeedbackSubmit';
import {FormEvent} from "react";
import useAuthManagement from "../useAuthManagement";
import useSearchAuth from "../query/useSearchAuth";

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
        feedbackStop,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    };
};

export default useFeedbackLogic;