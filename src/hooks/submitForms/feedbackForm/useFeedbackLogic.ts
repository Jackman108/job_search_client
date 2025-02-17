import {useAuth} from '../../../context/useAuthContext';
import {useSearchFormContext} from '../../../context/SearchFormContext';
import useFormState from '../useFormState';
import useFeedbackSubmit from './useFeedbackSubmit';
import {FormEvent} from "react";
import useAuthManagement from "../useAuthManagement";

const useFeedbackLogic = () => {
    const {token} = useAuth();
    const {feedbackSubmit, feedbackStop} = useFeedbackSubmit();
    const {isLoading, setIsLoading} = useSearchFormContext();

    const {
        vacancyAuths,
        selectedAuthId,
        setSelectedAuthId,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    } = useAuthManagement();

    const selectedAuth = vacancyAuths?.find(v => v.id === selectedAuthId) || null;

    const {formValues, errors, setErrors, handleInputChange} = useFormState(
        selectedAuth?.email || '',
        selectedAuth?.password || ''
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

    return {
        token,
        isLoading,
        errors,
        formValues,
        vacancyAuths,
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