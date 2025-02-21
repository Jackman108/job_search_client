import {FormEvent} from 'react';
import {useAuth} from '@app/providers/auth/useAuthContext';
import useVacancySubmit from './useVacancySubmit';
import {useSearchFormContext} from "@app/providers/search/useSearchFormContext";
import useFieldManagement from "./useFieldManagement";
import useAuthManagement from "@hooks/forms/useAuthManagement";
import useSearchAuth from "@hooks/forms/useSearchAuth";
import useSearchFields from "@features/vacancies/hooks/useSearchFields";
import useSearchFormState from "@hooks/forms/useSearchFormState";

const useSearchFormLogic = () => {
    const {token} = useAuth();
    const {vacancySubmit, vacancyStop} = useVacancySubmit();
    const {
        isLoading,
        setIsLoading,
        selectedAuthId,
        setSelectedAuthId,
        selectedFieldId,
        setSelectedFieldId
    } = useSearchFormContext();

    const {auths: searchAuths} = useSearchAuth();
    const {fields: searchFields} = useSearchFields();

    const selectedAuth = searchAuths?.find(v => v.id === selectedAuthId) || null;
    const selectedField = searchFields?.find(f => f.id === selectedFieldId) || null;

    const {formValues, errors, setErrors, handleInputChange, handleSelectChange} = useSearchFormState(
        selectedAuth,
        selectedField
    );

    const {handleCreateField, handleUpdateField, handleDeleteField} = useFieldManagement(formValues);
    const {handleCreateAuth, handleUpdateAuth, handleDeleteAuth} = useAuthManagement(formValues);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await vacancySubmit({
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
        searchFields,
        selectedAuthId,
        selectedFieldId,
        setSelectedAuthId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        onSubmit,
        onStop: vacancyStop,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    };
};

export default useSearchFormLogic;