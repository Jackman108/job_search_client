import useSearchFields from '@features/vacancies/hooks/useSearchFields';
import { useSearchFormContext } from '@app/providers/search/useSearchFormContext';
import { FormValues } from '@entities/search';

const useFieldManagement = (formValues: FormValues) => {
    const { createSearchField, updateSearchField, deleteSearchField } = useSearchFields();
    const { selectedFieldId, setSelectedFieldId } = useSearchFormContext();

    const handleCreateField = async () => {
        try {
            const newField = await createSearchField({
                position: formValues.position,
                message: formValues.message,
                vacancy_url: formValues.vacancyUrl,
                schedule: formValues.schedule,
                order_by: formValues.orderBy,
                search_field: formValues.searchField,
                experience: formValues.experience,
                search_period: formValues.searchPeriod,
            });
            if (newField?.id) {
                setSelectedFieldId(newField.id);
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
        } catch (error) {
            console.error('Failed to delete search field', error);
        }
    };

    return {
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    };
};

export default useFieldManagement;
