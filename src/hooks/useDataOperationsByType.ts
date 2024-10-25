// useDataOperationsByType.ts
import { useState, useCallback } from 'react';
import useApi from '../api/api';

export const useDataOperationsByType = (config: Record<string, any>) => {
    const { request } = useApi();
    const [data, setData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const [notFound, setNotFound] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<Record<string, string | null>>({});

    const loadData = useCallback(async () => {
        const promises = Object.entries(config).map(([type, item]) => fetchData(type, item.apiEndpoint()));
        await Promise.all(promises);
    }, [config, request]);

    const fetchData = async (type: string, endpoint: string) => {
        setLoading(prev => ({ ...prev, [type]: true }));
        try {
            const fetchedData = await request('get', endpoint);
            setData(prev => ({ ...prev, [type]: fetchedData }));
            setNotFound(prev => ({ ...prev, [type]: !fetchedData }));
        } catch (err) {
            handleError(type, err);
        } finally {
            setLoading(prev => ({ ...prev, [type]: false }));
        }
    };

    const handleError = (type: string, error: any) => {
        setNotFound(prev => ({ ...prev, [type]: true }));
        setError(prev => ({ ...prev, [type]: (error as Error).message }));
        console.error('Error fetching data', error);
    };

    const deleteItem = useCallback(async (type: string) => {
        try {
            await request('delete', config[type].apiEndpoint());
            setData(prev => ({ ...prev, [type]: null }));
        } catch (error) {
            console.error('Error deleting item', error);
        }
    }, [request, config]);

    return { data, loading, notFound, error, loadData, deleteItem };
};