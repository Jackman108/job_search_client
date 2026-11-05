import { useCallback } from 'react';
import { useFormState, useToggleFormState } from '@hooks';
import { useTranslation } from 'react-i18next';

const useTableLogic = <T extends { id?: string }>(
    config: Record<string, any>,
    fetchHook: (config: Record<string, any>) => any,
    actionType: string
) => {
    const { data, loading, error, saveItem, deleteItem, loadData } = fetchHook(config);
    const { formData, isEditing, handleEditClick, handleCancelClick } = useFormState<T>();
    const { showForm, handleToggleForm } = useToggleFormState();
    const configKey = Object.keys(config)[0];
    const { t } = useTranslation(configKey);

    const handleDelete = useCallback(async (id: string) => {
        if (window.confirm(t(`${configKey}.actions.deleteConfirm`))) {
            try {
                await deleteItem({ type: actionType, id });
            } catch (error) {
                console.error(`Error deleting ${actionType}:`, error);
            }
        }
    }, [actionType, deleteItem, t, configKey]);


    const handleCancelAction = useCallback(async (id: string) => {
        try {
            handleCancelClick(id);
            handleToggleForm();
        } catch (error) {
            console.error(`Error Cancel ${actionType}:`, error);
        }

    }, [actionType, handleCancelClick, handleToggleForm]);


    const handleFormSubmit = useCallback(async (formData: Partial<T>) => {
        try {
            const response = await saveItem({
                type: actionType,
                id: formData.id,
                formData,
                isEditing: isEditing[actionType],
            });

            await handleCancelAction(response.id);
            return response;
        } catch (error) {
            console.error(`Error saving ${actionType}:`, error);
        }
    }, [actionType, saveItem, isEditing, handleCancelAction]);

    return {
        data,
        loading,
        error,
        loadData,
        formData,
        isEditing,
        showForm,
        handleEditClick,
        handleDelete,
        handleFormSubmit,
        handleToggleForm,
        handleCancelAction,
    };
};

export default useTableLogic;