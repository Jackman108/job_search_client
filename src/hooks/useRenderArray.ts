import { useEffect, useState } from 'react';
import { ConfigItem } from '../Interfaces/InterfaceDataDisplay.types';
import { createDataForType, deleteDataForType, updateDataForType } from './useFetchData';
import { useAuth } from '../context/useAuthContext';

export const useRenderArray = (config: ConfigItem, initialData: any[]) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
    const [fetchedData, setFetchedData] = useState<any[]>(initialData);
    const { token } = useAuth();

    useEffect(() => {
        setFetchedData(initialData);
    }, [initialData, fetchedData]);

    const handleEditClick = (item: any) => {
        setFormData({ ...item });
        setIsEditing((prev) => ({ ...prev, [item.id]: true }));
    };

    const handleCancelEdit = (id: number) => {
        setFormData({});
        setIsEditing((prev) => ({ ...prev, [id]: false }));
    };

    const handleDeleteClick = async (id: number) => {
        if (!token) return;
        const { error } = await deleteDataForType(`${config.apiEndpoint()}/${id}`, token);
        if (!error) {
            setFetchedData((prev) => prev.filter(item => item.id !== id));
        } else {
            console.error('Ошибка при удалении', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        if (!token) {
            return;
        }

        const method = isEditing[id] ? updateDataForType : createDataForType;
        const endpoint = id ? `${config.apiEndpoint()}/${id}` : `${config.apiEndpoint()}`;

        try {
            const { error } = await method(endpoint, formData, token);
            if (!error) {
                setFetchedData((prev) => prev.map(item => (item.id === id ? { ...formData, id } : item)));
                setIsEditing((prev) => ({ ...prev, [id]: false }));
                setFormData({});
            }
        } catch (error) {
            console.error('Ошибка при сохранении', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return {
        formData,
        isEditing,
        fetchedData,
        handleEditClick,
        handleCancelEdit,
        handleDeleteClick,
        handleInputChange,
        handleSubmit,
    };
};
