import { useState, useCallback } from 'react';

export const useFormByType = (initialFormData = {}) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
    const [isCreating, setIsCreating] = useState<Record<string, boolean>>({});
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({ ...prev, [key]: value }));
    }, []);

    const resetFormData = useCallback(() => setFormData({}), []);

    const handleCreateClick = (type: string) => {
        setIsCreating(prev => ({ ...prev, [type]: true }));
        resetFormData();
    };

    const handleEditClick = (type: string, item: any) => {
        setIsEditing(prev => ({ ...prev, [type]: true }));
        setFormData({ ...item });
    };

    const handleCancelClick = (type: string) => {
        setIsEditing(prev => ({ ...prev, [type]: false }));
        setIsCreating(prev => ({ ...prev, [type]: false }));
        resetFormData();
    };



    return { formData, isCreating, isEditing, handleInputChange, handleCreateClick, handleEditClick, handleCancelClick };
};
