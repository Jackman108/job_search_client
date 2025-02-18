import useSearchFields from './query/useSearchFields';
import {useSearchFormContext} from '../../context/SearchFormContext';
import {FormValues} from "../../Interfaces/InterfaceForm.types";

const useFieldManagement = (formValues: FormValues) => {
    const {createSearchField, updateSearchField, deleteSearchField} = useSearchFields();
    const {selectedFieldId, setSelectedFieldId} = useSearchFormContext();

    const handleCreateField = async () => {
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
    };

    const handleUpdateField = async () => {
        if (selectedFieldId) {
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
        }
    };

    const handleDeleteField = async () => {
        if (selectedFieldId) {
            await deleteSearchField(selectedFieldId);
            setSelectedFieldId(null);
        }
    };

    return {
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    };
};

export default useFieldManagement;