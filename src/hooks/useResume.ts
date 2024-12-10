import {useCallback, useEffect} from 'react';
import {ResumeConfigProps} from '../Interfaces/InterfaceResume.types';
import useApi from '../api/api';
import {useFeatchResumeByType} from './fetch/useFeatchResumeByType';
import {useResumeHandlersByType} from './useResumeHandlersByType';

export const useResume = (config: ResumeConfigProps['config']) => {
    const {
        data,
        loading,
        notFound,
        error,
        loadData,
        deleteItem
    } = useFeatchResumeByType(config);

    const {
        formData,
        isCreating,
        isEditing,
        handleInputChange,
        handleEditClick,
        handleCreateClick,
        handleCancelClick
    } = useResumeHandlersByType(data);

    const {request} = useApi();

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
        if (formData.business_trip_readiness) {
            formData.business_trip_readiness = formData.business_trip_readiness === 'Готов';
        }
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
