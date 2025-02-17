import {FormEvent} from 'react';
import {useAuth} from '../../../context/useAuthContext';
import useFormState from '../useFormState';
import useVacancySubmit from './useVacancySubmit';

import {useSearchFormContext} from "../../../context/SearchFormContext";
import useFieldManagement from "../useFieldManagement";
import useAuthManagement from "../useAuthManagement";

const useSearchFormLogic = () => {
    const {token} = useAuth();
    const {handleSubmit, handleStop} = useVacancySubmit();

    const {
        isLoading,
        setIsLoading,
    } = useSearchFormContext();

    const {
        vacancyFields,
        selectedFieldId,
        setSelectedFieldId,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    } = useFieldManagement();

    const {
        vacancyAuths,
        selectedAuthId,
        setSelectedAuthId,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
    } = useAuthManagement();

    const selectedAuth = vacancyAuths?.find(v => v.id === selectedAuthId) || null;
    const selectedField = vacancyFields?.find(f => f.id === selectedFieldId) || null;

    const {formValues, errors, setErrors, handleInputChange, handleSelectChange} = useFormState(
        selectedAuth?.email || '',
        selectedAuth?.password || '',
        selectedField || null
    );

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await handleSubmit({
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
        vacancyFields,
        selectedAuthId,
        selectedFieldId,
        setSelectedAuthId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        onSubmit,
        handleStop,
        handleCreateVacancy: handleCreateAuth,
        handleUpdateVacancy: handleUpdateAuth,
        handleDeleteVacancy: handleDeleteAuth,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    };
};

export default useSearchFormLogic;