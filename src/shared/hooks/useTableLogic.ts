import {useCallback} from 'react';
import {useFormState} from '@features/resume/hooks/useFormState';
import {useToggleFormState} from '@hooks/forms/useToggleFormState';
import {useTranslation} from 'react-i18next';

export const useTableLogic = <T extends { id?: string }>(
    config: Record<string, any>,
    fetchHook: (config: Record<string, any>) => any,
    actionType: string
) => {
    const {data, loading, error, saveItem, deleteItem} = fetchHook(config);
    const {formData, isEditing, handleEditClick, resetFormData, handleCancelClick} = useFormState<T>();
    const {showForm, handleToggleForm} = useToggleFormState();
    const configKey = Object.keys(config)[0];
    const {t} = useTranslation(configKey);

    const handleDelete = useCallback(async (id: string) => {
        if (window.confirm(t(`${configKey}.actions.deleteConfirm`))) {
            try {
                await deleteItem({type: actionType, id});
            } catch (error) {
                console.error(`Error deleting ${actionType}:`, error);
            }
        }
    }, [actionType, deleteItem, t, configKey]);

    const handleFormSubmit = useCallback(async (formData: Partial<T>) => {
        try {
            await saveItem({
                type: actionType,
                id: formData.id,
                formData,
                isEditing: isEditing[actionType],
            });
            resetFormData();
            handleCancelClick(actionType);
            handleToggleForm();
        } catch (error) {
            console.error(`Error saving ${actionType}:`, error);
        }
    }, [actionType, saveItem, isEditing, resetFormData, handleCancelClick, handleToggleForm]);

    return {
        data,
        loading,
        error,
        formData,
        isEditing,
        showForm,
        handleEditClick,
        handleDelete,
        handleFormSubmit,
        handleToggleForm,
        handleCancelClick,
    };
};