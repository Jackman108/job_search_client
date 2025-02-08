import {FormEvent, useCallback, useEffect} from 'react';
import {ResumeConfigProps} from '../Interfaces/InterfaceResume.types';
import useApi from '../api/useApi';
import {useFetchResumeByType} from './fetch/useFetchResumeByType';
import {useResumeHandlersByType} from './useResumeHandlersByType';

export const useResume = (config: ResumeConfigProps['config']) => {
    const {
        data,
        loading,
        notFound,
        error,
        loadData,
        deleteItem
    } = useFetchResumeByType(config);

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
        loadData().catch((error) => {
            console.error('Resume fetch error', error);
        });
    }, [loadData]);

    const handleDeleteClick = useCallback(async (type: string) => {
        try {
            await deleteItem(type);
        } catch (error) {
            console.error('Resume delete error', error);
        }
    }, [deleteItem]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();
        if (config[type]) {
            await saveData(type);
        }
    };

    const saveData = async (type: string) => {
        const endpoint = config[type].apiEndpoint();
        const method = isCreating[type] ? 'post' : 'put';

        if (type === 'resume' && formData.business_trip_readiness) {
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
