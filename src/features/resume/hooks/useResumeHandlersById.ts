import {ChangeEvent} from 'react';
import {useFormState} from "./useFormState";

export const useResumeHandlersById = () => {
    const {
        formData,
        isEditing,
        isCreating,
        setFormData,
        handleEditClick,
        handleCancelClick,
    } = useFormState();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prev) => ({...prev, [key]: value}));
    };

    return {
        formData,
        isEditing,
        isCreating,
        handleEditClick: (item: any) => handleEditClick(item.id.toString(), item),
        handleCancelClick: (id: number) => handleCancelClick(id.toString()),
        handleInputChange,
        setFormData,
    };
};
