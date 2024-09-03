// useDataDisplay.ts
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { DataDisplayProps } from '../Interfaces/InterfaceDataDisplay.types';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';
import { fetchDataForType } from './useFetchData';


export const useDataDisplay = (config: DataDisplayProps['config']) => {
    const [data, setData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const [notFound, setNotFound] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<Record<string, string | null>>({});
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
    const { userProfile } = useAuth();
    const userId = userProfile?.userId;

    const loadData = useCallback(async () => {
        if (!userId) {
            setError({ global: 'Ошибка: Не задан userId' });
            return;
        }

        const newLoading: Record<string, boolean> = {};
        const newError: Record<string, string | null> = {};
        const newData: Record<string, any> = {};
        const newNotFound: Record<string, boolean> = {}; 

        for (const [type, item] of Object.entries(config)) {
            newLoading[type] = true;
            const { data, error } = await fetchDataForType(item.apiEndpoint(userId));
            newData[type] = data;
            newError[type] = error;
            newLoading[type] = false;
        }

        setData(newData);
        setLoading(newLoading);
        setError(newError);
        setNotFound(newNotFound);
    }, [config, userId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        if (isCreating) {
            setFormData({});
        }
    }, [isCreating]);

    const handleCreateClick = () => {
        setIsCreating(true);
        setIsEditing({});
        
    };

    const handleEditClick = (type: string) => {
        setFormData(data[type] || {});
        setIsEditing({ [type]: true });
        setIsCreating(false);
    };

    const handleDeleteClick = async (type: string) => {
        if (userId) {
            try {
                const endpoint = `${API_URL}${config[type].apiEndpoint(userId)}`;
                const response = await axios.delete(endpoint, { withCredentials: true });
                if (response.status === 200) {
                    await loadData();
                } else {
                    alert('Ошибка удаления записи');
                }
            } catch {
                alert('Ошибка при удалении записи');
            }
        }
    };
    const handleCancelClick = (type: string) => {
        setIsEditing((prev) => ({ ...prev, [type]: false }));
        setIsCreating(false);
      };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();
        if (config[type] && userId) {
            const endpoint = config[type].apiEndpoint(userId);
            try {
                const method = isCreating ? 'post' : 'put';
                const response = await axios[method](`${API_URL}${endpoint}`, formData, { withCredentials: true });
                if (response.status === (isCreating ? 201 : 200)) {
                    await loadData();
                    setIsEditing(prev => ({ ...prev, [type]: false }));
                    setIsCreating(false);
                } else {
                    alert('Ошибка записи');
                }
            } catch {
                alert('Ошибка при сохранении записи');
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
        userId,
    };
};
