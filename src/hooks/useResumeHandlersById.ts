// hooks/useResumeHandlersById.ts
import {ChangeEvent, useState} from 'react';

export const useResumeHandlersById = () => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
    const [isCreating, setIsCreating] = useState<Record<string, boolean>>({});

    const handleEditClick = (item: any) => {
        setFormData({...item});
        setIsEditing((prev) => ({...prev, [item.id]: true}));
    };

    const handleCancelClick = (id: number) => {
        setFormData({});
        setIsEditing((prev) => ({...prev, [id]: false}));
        setIsCreating((prev) => ({...prev, [id]: false}));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prev) => ({...prev, [key]: value}));
    };

    return {
        formData,
        isEditing,
        isCreating,
        handleEditClick,
        handleCancelClick,
        handleInputChange,
        setFormData,
    };
};
