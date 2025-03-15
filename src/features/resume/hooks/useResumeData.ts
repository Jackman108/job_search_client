import {FormEvent} from 'react';
import {useResumeHandlersByType} from "./useResumeHandlersByType";
import {useFetchByType} from "@api";
import {QueryConfigProps} from "@type";

export const useResumeData = (config: QueryConfigProps['config']) => {
    const {fetchedData, loading, error, loadData, saveItem, deleteItem} = useFetchByType(config);

    const {
        formData,
        isCreating,
        isEditing,
        handleInputChange,
        handleEditClick,
        handleCreateClick,
        handleCancelClick,
        prepareDataForSubmit
    } = useResumeHandlersByType(fetchedData);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();
        try {
            const updatedFormData = prepareDataForSubmit(type, formData);
            await saveItem({type, id: formData.id, formData: updatedFormData, isEditing: isEditing[type]});
            handleCancelClick(type);
            await loadData();
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
        }
    };

    return {
        fetchedData,
        loading,
        error,
        formData,
        isCreating,
        isEditing,
        handleCreateClick,
        handleEditClick,
        deleteItem,
        handleSubmit,
        handleInputChange,
        handleCancelClick,
    };
};
