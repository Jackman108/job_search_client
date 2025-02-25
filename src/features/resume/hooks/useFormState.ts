import {useCallback, useState} from 'react';

export const useFormState = <T extends Record<string, any>>(initialFormData: Partial<T> = {}) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
    const [isCreating, setIsCreating] = useState<Record<string, boolean>>({});

    const resetFormData = useCallback(() => setFormData({}), []);

    const handleEditClick = useCallback((id: string, item: any) => {
        setIsEditing((prev) => ({...prev, [id]: true}));
        setFormData(item);
    }, []);

    const handleCancelClick = useCallback((id: string) => {
        setIsEditing((prev) => ({...prev, [id]: false}));
        setIsCreating((prev) => ({...prev, [id]: false}));
        resetFormData();
    }, [resetFormData]);

    const handleCreateClick = useCallback((id: string) => {
        setIsCreating((prev) => ({...prev, [id]: true}));
        resetFormData();
    }, [resetFormData]);

    return {
        formData,
        isEditing,
        isCreating,
        setFormData,
        handleEditClick,
        handleCancelClick,
        handleCreateClick,
        resetFormData,
    };
};