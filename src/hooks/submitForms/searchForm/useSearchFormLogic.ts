import {FormEvent} from 'react';
import {useAuth} from '../../../context/useAuthContext';
import useSearchFormState from '../useSearchFormState';
import useVacancySubmit from './useVacancySubmit';
import {useSearchFormContext} from "../../../context/SearchFormContext";
import useFieldManagement from "../useFieldManagement";
import useAuthManagement from "../useAuthManagement";
import useSearchAuth from "../query/useSearchAuth";
import useSearchFields from "../query/useSearchFields";

const useSearchFormLogic = () => {
    const {token} = useAuth();
    const {handleSubmit, handleStop} = useVacancySubmit();
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
        searchAuths,
        searchFields,
        selectedAuthId,
        selectedFieldId,
        setSelectedAuthId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        onSubmit,
        handleStop,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    };
};

export default useSearchFormLogic;