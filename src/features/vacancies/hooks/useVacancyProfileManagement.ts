import useSearchFields from '@features/vacancies/hooks/useSearchFields';
import useSearchAuth from '@shared/hooks/forms/useSearchAuth';
import { useSearchFormContext } from '@app/providers/search/useSearchFormContext';
import { FormValues } from '@entities/search';
import { clearSearchFormDraft } from '@shared/utils/searchFormDraft.utils';

type CreatedId = { id?: number };

const fieldPayload = (formValues: FormValues) => ({
    position: formValues.position,
    message: formValues.message,
    vacancy_url: formValues.vacancyUrl,
    schedule: formValues.schedule,
    order_by: formValues.orderBy,
    search_field: formValues.searchField,
    experience: formValues.experience,
    search_period: formValues.searchPeriod,
});

const useVacancyProfileManagement = (
    formValues: FormValues,
    linkedAuthId: number | null,
    resetProfileToBlank: (opts?: { keepDraft?: boolean }) => void,
) => {
    const { createSearchField, updateSearchField, deleteSearchField } = useSearchFields();
    const { createSearchAuth, updateSearchAuth } = useSearchAuth();
    const { selectedFieldId, setSelectedFieldId, setSelectedAuthId } = useSearchFormContext();

    const handleStartCreateProfile = () => {
        setSelectedFieldId(null);
        setSelectedAuthId(null);
        resetProfileToBlank({ keepDraft: true });
    };

    const handleSaveProfile = async () => {
        if (selectedFieldId) {
            let authId = linkedAuthId;
            if (authId) {
                await updateSearchAuth({
                    id: authId,
                    email: formValues.email,
                    password: formValues.password,
                });
            } else {
                const createdAuth = (await createSearchAuth({
                    email: formValues.email,
                    password: formValues.password,
                })) as CreatedId;
                authId = createdAuth?.id ?? null;
                if (authId) {
                    setSelectedAuthId(authId);
                }
            }

            await updateSearchField({
                id: selectedFieldId,
                ...fieldPayload(formValues),
                vacancy_auth_id: authId,
            });
            return;
        }

        const createdAuth = (await createSearchAuth({
            email: formValues.email,
            password: formValues.password,
        })) as CreatedId;
        const authId = createdAuth?.id;
        if (!authId) {
            throw new Error('Failed to create HH credentials for profile');
        }

        const createdField = (await createSearchField({
            ...fieldPayload(formValues),
            vacancy_auth_id: authId,
        })) as CreatedId;

        clearSearchFormDraft();
        setSelectedAuthId(authId);
        if (createdField?.id) {
            setSelectedFieldId(createdField.id);
        }
    };

    const handleDeleteProfile = async () => {
        if (!selectedFieldId) return;
        try {
            await deleteSearchField(selectedFieldId);
            setSelectedFieldId(null);
            setSelectedAuthId(null);
            resetProfileToBlank();
        } catch (error) {
            console.error('Failed to delete vacancy profile', error);
        }
    };

    return {
        handleStartCreateProfile,
        handleSaveProfile,
        handleDeleteProfile,
    };
};

export default useVacancyProfileManagement;
