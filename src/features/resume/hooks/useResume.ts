import {FormEvent} from 'react';
import {ResumeConfigProps} from '../types/InterfaceResume.types';
import {useResumeHandlersByType} from "./useResumeHandlersByType";
import {useFetchByType} from "@hooks/useFetchByType";

export const useResume = (config: ResumeConfigProps['config']) => {
    const {
        fetchedData,
        loading,
        error,
        saveItem,
        deleteItem
    } = useFetchByType(config);

    const {
        formData,
        isCreating,
        isEditing,
        handleInputChange,
        handleEditClick,
        handleCreateClick,
        handleCancelClick,
        prepareDataForSubmit
    } = useResumeHandlersByType();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();
        try {
            const updatedFormData = prepareDataForSubmit(type, formData);
            await saveItem({type, id: formData.id, formData: updatedFormData, isEditing: isEditing[type]});
            handleCancelClick(type);
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
