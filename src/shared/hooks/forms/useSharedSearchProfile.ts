import { useEffect, useMemo, useState } from 'react';
import { useSearchFormContext } from '@app/providers/search/useSearchFormContext';
import useVacancyProfileManagement from './useVacancyProfileManagement';
import useSearchAuth from './useSearchAuth';
import useSearchFormState from './useSearchFormState';
import useSearchFields from './useSearchFields';
import useClearStaleProfileSelection from './useClearStaleProfileSelection';
import { FORM_CONFIG, FormValues } from '@entities/search';
import { hasFilledRequiredFields } from '@shared/utils/formRequired.utils';

const PROFILE_REQUIRED_KEYS = (Object.entries(FORM_CONFIG.fields) as [keyof FormValues, { required?: boolean }][])
    .filter(([, config]) => config.required)
    .map(([key]) => key);

/** Feedback refresh: HH credentials only (profile chrome still shared). */
const HH_CREDENTIAL_KEYS: (keyof FormValues & string)[] = ['email', 'password'];

/** Shared search-profile + linked HH auth for SearchForm and FeedbackForm. */
const useSharedSearchProfile = (commitKeys: (keyof FormValues & string)[] = PROFILE_REQUIRED_KEYS) => {
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

    const fieldsLocked = !isEditing || isLoading;
    const canCommit = useMemo(
        () => isDirty && hasFilledRequiredFields(formValues, commitKeys),
        [formValues, isDirty, commitKeys],
    );

    return {
        isLoading,
        setIsLoading,
        fieldsLocked,
        isEditing,
        setIsEditing,
        canCommit,
        errors,
        setErrors,
        formValues,
        searchFields,
        selectedFieldId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        handleStartCreateProfile,
        handleSaveProfile,
        handleDeleteProfile,
    };
};

export default useSharedSearchProfile;
export { PROFILE_REQUIRED_KEYS, HH_CREDENTIAL_KEYS };
