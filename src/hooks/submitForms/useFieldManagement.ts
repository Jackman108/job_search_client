import useSearchFields from '../fetch/useSearchFields';
import {useSearchFormContext} from '../../context/SearchFormContext';
import useFormState from "./useFormState";

const useFieldManagement = () => {
    const {fields: vacancyFields, createSearchField, updateSearchField, deleteSearchField} = useSearchFields();
    const {selectedFieldId, setSelectedFieldId} = useSearchFormContext();
    const selectedField = vacancyFields?.find(f => f.id === selectedFieldId) || null;

    const {formValues} = useFormState(
        '', // initialEmail
        '', // initialPassword
        selectedField // initialFields
    );

    const {position, message, vacancyUrl} = formValues;

    const handleCreateField = async () => {
        await createSearchField({
            position,
            message,
            vacancy_url: vacancyUrl,
            schedule: formValues.schedule,
            order_by: formValues.orderBy,
            search_field: formValues.searchField,
            experience: formValues.experience,
            search_period: formValues.searchPeriod,
        });
        setSelectedFieldId(null);
    };

    const handleUpdateField = async () => {
        if (selectedFieldId) {
            await updateSearchField({
                id: selectedFieldId,
                position,
                message,
                vacancy_url: vacancyUrl,
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
        vacancyFields,
        selectedFieldId,
        setSelectedFieldId,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
    };
};

export default useFieldManagement;