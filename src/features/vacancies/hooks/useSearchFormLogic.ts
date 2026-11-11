import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import useVacancySubmit from './useVacancySubmit';
import { useSearchFormContext } from '@app/providers/search/useSearchFormContext';
import useVacancyProfileManagement from './useVacancyProfileManagement';
import { useSearchAuth, useSearchFormState } from '@hooks';
import useSearchFields from '@features/vacancies/hooks/useSearchFields';
import useClearStaleProfileSelection from '@shared/hooks/forms/useClearStaleProfileSelection';
import { FORM_CONFIG, FormValues } from '@entities/search';
import { hasFilledRequiredFields } from '@shared/utils/formRequired.utils';

const PROFILE_REQUIRED_KEYS = (Object.entries(FORM_CONFIG.fields) as [keyof FormValues, { required?: boolean }][])
    .filter(([, config]) => config.required)
    .map(([key]) => key);

const useSearchFormLogic = () => {
    const { token } = useAuth();
    const { vacancySubmit, vacancyStop } = useVacancySubmit();
    const { isLoading, setIsLoading, selectedAuthId, setSelectedAuthId, selectedFieldId, setSelectedFieldId } =
        useSearchFormContext();
    const [isEditing, setIsEditing] = useState(false);

    const { auths: searchAuths } = useSearchAuth();
    const { fields: searchFields } = useSearchFields();

    useClearStaleProfileSelection(searchFields, selectedFieldId, setSelectedFieldId);

    const selectedField = searchFields?.find((f) => f.id === selectedFieldId) || null;
    const linkedAuthId = selectedField?.vacancy_auth_id ?? null;
    const selectedAuth = searchAuths?.find((auth) => auth.id === (linkedAuthId ?? selectedAuthId)) || null;

    useEffect(() => {
        if (linkedAuthId != null && linkedAuthId !== selectedAuthId) {
            setSelectedAuthId(linkedAuthId);
        }
    }, [linkedAuthId, selectedAuthId, setSelectedAuthId]);

    const {
        formValues,
        errors,
        setErrors,
        isDirty,
        handleInputChange,
        handleSelectChange,
        resetAuthToBlank,
        resetFieldToBlank,
    } = useSearchFormState(selectedAuth, selectedField);

    const resetProfileToBlank = (opts?: { keepDraft?: boolean }) => {
        resetAuthToBlank();
        resetFieldToBlank(opts);
    };

    const { handleStartCreateProfile, handleSaveProfile, handleDeleteProfile } = useVacancyProfileManagement(
        formValues,
        linkedAuthId,
        resetProfileToBlank,
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

    const fieldsLocked = !isEditing || isLoading;
    const canCommit = useMemo(
        () => isDirty && hasFilledRequiredFields(formValues, PROFILE_REQUIRED_KEYS),
        [formValues, isDirty],
    );

    return {
        token,
        isLoading,
        fieldsLocked,
        isEditing,
        setIsEditing,
        canCommit,
        errors,
        formValues,
        searchFields,
        selectedFieldId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        onSubmit,
        onStop,
        handleStartCreateProfile,
        handleSaveProfile,
        handleDeleteProfile,
    };
};

export default useSearchFormLogic;
