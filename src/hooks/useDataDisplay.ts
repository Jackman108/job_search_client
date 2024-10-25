// useDataDisplay.ts
import { useCallback, useEffect } from 'react';
import { DataDisplayProps } from '../Interfaces/InterfaceDataDisplay.types';
import useApi from '../api/api';
import { useDataOperationsByType } from './useDataOperationsByType';
import { useFormByType } from './useFormByType';

export const useDataDisplay = (config: DataDisplayProps['config']) => {
    const {
        data,
        loading,
        notFound,
        error,
        loadData,
        deleteItem
    } = useDataOperationsByType(config);

    const {
        formData,
        isCreating,
        isEditing,
        handleInputChange,
        handleEditClick,
        handleCreateClick,
        handleCancelClick
    } = useFormByType();

    const { request } = useApi();

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleDeleteClick = useCallback((type: string) => {
        deleteItem(type);
    }, [deleteItem]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();
        if (config[type]) {
            await saveData(type);
        }
    };

    const saveData = async (type: string) => {
        const endpoint = config[type].apiEndpoint();
        const method = isCreating[type] ? 'post' : 'put';
        try {
            await request(method, endpoint, formData);
            await loadData();
            handleCancelClick(type);
        } catch (error) {
            console.error('Error during save', error);
        }
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
