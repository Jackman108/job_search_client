import { useEffect, useState } from 'react';
import { ConfigItem } from '../Interfaces/InterfaceDataDisplay.types';
import { API_URL } from '../config/serverConfig';
import { createDataForType, deleteDataForType, updateDataForType } from './useFetchData';

export const useRenderArray = (config: ConfigItem, userId: string, initialData: any[]) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
    const [fetchedData, setFetchedData] = useState<any[]>(initialData);

    useEffect(() => {
        setFetchedData(initialData);
    }, [initialData]);

    const handleEditClick = (item: any) => {
        setFormData({ ...item });
        setIsEditing((prev) => ({ ...prev, [item.id]: true }));
    };

    const handleCancelEdit = (id: number) => {
        setFormData({});
        setIsEditing((prev) => ({ ...prev, [id]: false }));
    };

    const handleDeleteClick = async (id: number) => {
        const { error } = await deleteDataForType(`${config.apiEndpoint(userId)}/${id}`);
        if (!error) {
            setFetchedData((prev) => prev.filter(item => item.id !== id));
        } else {
            console.error('Ошибка при удалении', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        const method = isEditing[id] ? updateDataForType : createDataForType;
        const endpoint = `${API_URL}${config.apiEndpoint(userId)}/${id || ''}`;

        try {
            const { error } = await method(endpoint, formData);
            if (!error) {
                setIsEditing((prev) => ({ ...prev, [id]: true }));
                setFetchedData((prev) => prev.map(item => (item.id === id ? { ...formData, id } : item)));
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
        data: fetchedData,
        formData,
        isEditing,
        handleEditClick,
        handleCancelEdit,
        handleDeleteClick,
        handleSubmit,
        handleInputChange,
        setFormData,
    };
};
