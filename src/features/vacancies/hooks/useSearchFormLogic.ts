import { FormEvent } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import useVacancySubmit from './useVacancySubmit';
import { useSearchFormContext } from '@app/providers/search/useSearchFormContext';
import useFieldManagement from './useFieldManagement';
import { useAuthManagement, useSearchAuth, useSearchFormState } from '@hooks';
import useSearchFields from '@features/vacancies/hooks/useSearchFields';
import useClearStaleProfileSelection from '@shared/hooks/forms/useClearStaleProfileSelection';

const useSearchFormLogic = () => {
    const { token } = useAuth();
    const { vacancySubmit, vacancyStop } = useVacancySubmit();
    const { isLoading, setIsLoading, selectedAuthId, setSelectedAuthId, selectedFieldId, setSelectedFieldId } =
        useSearchFormContext();

    const { auths: searchAuths } = useSearchAuth();
    const { fields: searchFields } = useSearchFields();

    useClearStaleProfileSelection(searchAuths, selectedAuthId, setSelectedAuthId);
    useClearStaleProfileSelection(searchFields, selectedFieldId, setSelectedFieldId);

    const selectedAuth = searchAuths?.find((v) => v.id === selectedAuthId) || null;
    const selectedField = searchFields?.find((f) => f.id === selectedFieldId) || null;

    const {
        formValues,
        errors,
        setErrors,
        handleInputChange,
        handleSelectChange,
        resetAuthToBlank,
        resetFieldToBlank,
    } = useSearchFormState(selectedAuth, selectedField);

    const { handleStartCreateField, handleCreateField, handleUpdateField, handleDeleteField } = useFieldManagement(
        formValues,
        resetFieldToBlank,
    );
    const { handleStartCreateAuth, handleCreateAuth, handleUpdateAuth, handleDeleteAuth } = useAuthManagement(
        formValues,
        resetAuthToBlank,
    );

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await vacancySubmit({
            ...formValues,
            token,
            setErrors,
            setIsLoading,
        });
    };
    const onStop = async () => {
        await vacancyStop();
        setIsLoading(false);
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
        onStop,
        handleStartCreateAuth,
        handleCreateAuth,
        handleUpdateAuth,
        handleDeleteAuth,
        handleStartCreateField,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    };
};

export default useSearchFormLogic;
