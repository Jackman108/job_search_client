import {FormEvent} from 'react';
import {useAuth} from '../../context/useAuthContext';
import useSearchFormState from './useSearchFormState';
import useVacancySubmit from './useVacancySubmit';
import useSearchAuth from '../fetch/useSearchAuth';
import useSearchFields from '../fetch/useSearchFields';
import {useSearchFormContext} from "../../context/SearchFormContext";

const useSearchFormLogic = (onClose: () => void) => {
    const {token} = useAuth();
    const {auths: vacancyAuths, createSearchAuth, updateSearchAuth, deleteSearchAuth} = useSearchAuth();
    const {fields: vacancyFields, createSearchField, updateSearchField, deleteSearchField} = useSearchFields();

    const {
        selectedAuthId,
        selectedFieldId,
        isLoading,
        setSelectedAuthId,
        setSelectedFieldId,
        setIsLoading,
    } = useSearchFormContext();

    const selectedVacancy = vacancyAuths?.find(v => v.id === selectedAuthId) || null;
    const selectedField = vacancyFields?.find(f => f.id === selectedFieldId) || null;

    const {formValues, errors, setErrors, handleInputChange, handleSelectChange} = useSearchFormState(
        selectedVacancy?.email || '',
        selectedVacancy?.password || '',
        selectedField || null
    );

    const {handleSubmit, handleStop} = useVacancySubmit();

    const {email, password, position, message, vacancyUrl} = formValues;

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await handleSubmit({
            ...formValues,
            token,
            setErrors,
            setIsLoading,
        });
    };

    const handleCreateVacancy = async () => {
        await createSearchAuth({email, password});
        setSelectedAuthId(null);
    };

    const handleUpdateVacancy = async () => {
        if (selectedAuthId) {
            await updateSearchAuth({id: selectedAuthId, email, password});
        }
    };

    const handleDeleteVacancy = async () => {
        if (selectedAuthId) {
            await deleteSearchAuth(selectedAuthId);
            setSelectedAuthId(null);
        }
    };

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
        token,
        isLoading,
        errors,
        formValues,
        vacancyAuths,
        vacancyFields,
        selectedAuthId,
        selectedFieldId,
        setSelectedAuthId,
        setSelectedFieldId,
        handleInputChange,
        handleSelectChange,
        onSubmit,
        handleStop,
        handleCreateVacancy,
        handleUpdateVacancy,
        handleDeleteVacancy,
        handleCreateField,
        handleUpdateField,
        handleDeleteField,
        onClose,
    };
};

export default useSearchFormLogic;