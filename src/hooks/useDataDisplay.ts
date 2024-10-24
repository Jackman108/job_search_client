// useDataDisplay.ts
import { useCallback, useEffect, useState } from 'react';
import { DataDisplayProps } from '../Interfaces/InterfaceDataDisplay.types';
import { useAuth } from '../context/useAuthContext';
import { createDataForType, deleteDataForType, fetchDataForType, updateDataForType } from './useFetchData';

export const useDataDisplay = (config: DataDisplayProps['config']) => {
    const [data, setData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const [notFound, setNotFound] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<Record<string, string | null>>({});
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isCreating, setIsCreating] = useState<Record<string, boolean>>({});
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
    const { token } = useAuth();

    const loadData = useCallback(async () => {
        if (!token) {
            setError({ global: 'Ошибка: Не задан userId' });
            return;
        }

        const newLoading: Record<string, boolean> = {};
        const newData: Record<string, any> = {};
        const newNotFound: Record<string, boolean> = {};

        await Promise.all(Object.entries(config).map(async ([type, item]) => {
            newLoading[type] = true;
            const { data: fetchedData, error } = await fetchDataForType(item.apiEndpoint(), token);
            newData[type] = fetchedData;
            newLoading[type] = false;
            newNotFound[type] = !fetchedData;
            if (error) setError((prev) => ({ ...prev, [type]: error }));
        }));

        setData(newData);
        setLoading(newLoading);
        setNotFound(newNotFound);
    }, [config, token]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        if (isCreating) {
            setFormData({});
        }
    }, [isCreating]);

    const handleCreateClick = (type: string) => {
        setIsCreating((prev) => ({ ...prev, [type]: true }));
        setFormData({});
    };

    const handleEditClick = (type: string, item: any) => {
        setIsEditing((prev) => ({ ...prev, [type]: true }));
        setFormData({ ...item });
    };

    const handleDeleteClick = async (type: string) => {
        if (token) {
            const { error } = await deleteDataForType(config[type].apiEndpoint(), token);
            if (!error) {
                await loadData();
            } else {
                console.error('Ошибка при удалении записи', error);
            }
        }
    };
    const handleCancelClick = (type: string) => {
        setIsEditing((prev) => ({ ...prev, [type]: false }));
        setIsCreating((prev) => ({ ...prev, [type]: false }));
        setFormData({});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();
        if (config[type] && token) {
            const endpoint = config[type].apiEndpoint();
            try {
                const method = isCreating[type] ? createDataForType : updateDataForType;
                const { error } = await method(endpoint, formData, token);
                if (!error) {
                    await loadData();
                    handleCancelClick(type);
                }
            } catch (error) {
                console.error('Ошибка при сохранении', error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return {
        data,
        loading,
        error,
        notFound,
        formData,
        isCreating,
        isEditing,
        handleCreateClick,
        handleEditClick,
        handleDeleteClick,
        handleSubmit,
        handleInputChange,
        handleCancelClick,
    };
};
