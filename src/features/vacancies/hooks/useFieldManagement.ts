import useSearchFields from '@features/vacancies/hooks/useSearchFields';
import { useSearchFormContext } from '@app/providers/search/useSearchFormContext';
import { FormValues } from '@entities/search';
import { clearSearchFormDraft } from '@shared/utils/searchFormDraft.utils';

type CreatedId = { id?: number };

const useFieldManagement = (formValues: FormValues, resetFieldToBlank: (opts?: { keepDraft?: boolean }) => void) => {
    const { createSearchField, updateSearchField, deleteSearchField } = useSearchFields();
    const { selectedFieldId, setSelectedFieldId } = useSearchFormContext();

    const handleStartCreateField = () => {
        setSelectedFieldId(null);
        resetFieldToBlank({ keepDraft: true });
    };

    const handleCreateField = async () => {
        try {
            const created = (await createSearchField({
                position: formValues.position,
                message: formValues.message,
                vacancy_url: formValues.vacancyUrl,
                schedule: formValues.schedule,
                order_by: formValues.orderBy,
                search_field: formValues.searchField,
                experience: formValues.experience,
                search_period: formValues.searchPeriod,
            })) as CreatedId;
            if (created?.id) {
                clearSearchFormDraft();
                setSelectedFieldId(created.id);
            }
        } catch (error) {
            console.error('Failed to create search field', error);
        }
    };

    const handleUpdateField = async () => {
        if (!selectedFieldId) return;
        try {
            await updateSearchField({
                id: selectedFieldId,
                position: formValues.position,
                message: formValues.message,
                vacancy_url: formValues.vacancyUrl,
                schedule: formValues.schedule,
                order_by: formValues.orderBy,
                search_field: formValues.searchField,
                experience: formValues.experience,
                search_period: formValues.searchPeriod,
            });
        } catch (error) {
            console.error('Failed to update search field', error);
        }
    };

    const handleDeleteField = async () => {
        if (!selectedFieldId) return;
        try {
            await deleteSearchField(selectedFieldId);
            setSelectedFieldId(null);
            resetFieldToBlank();
        } catch (error) {
            console.error('Failed to delete search field', error);
        }
    };

    return {
        handleStartCreateField,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    };
};

export default useFieldManagement;
