// hooks/useFetchResumeById.ts
import {useCallback, useState} from 'react';
import {ConfigItem} from '../../Interfaces/InterfaceResume.types';
import useApi from '../../api/api';

export const useFetchById = (config: ConfigItem) => {
    const {request, loading, error} = useApi();
    const [fetchedData, setFetchedData] = useState<any[]>([]);

    const loadData = useCallback(async () => {
        if (!config.apiEndpoint) return;
        const data = await request('get', config.apiEndpoint());
        setFetchedData(data);
    }, [config, request]);

    const deleteItem = async (id: number) => {
        await request('delete', `${config.apiEndpoint()}/${id}`);
        setFetchedData((prev) => prev.filter(item => item.id !== id));
    };

    const saveItem = async (id: number, formData: any, isEditing: boolean) => {
        const method = isEditing ? 'put' : 'post';
        await request(method, `${config.apiEndpoint()}/${id}`, formData);
        await loadData();
    };

    return {
        fetchedData,
        loadData,
        deleteItem,
        saveItem,
        loading,
        error,
    };
};
