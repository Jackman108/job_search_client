import {useMutation, useQuery} from '@tanstack/react-query';
import {ConfigItem} from '../../Interfaces/InterfaceResume.types';
import useDataApi from '../../api/useDataApi';
import {
    DeleteItemMutationParams,
    FetchByTypeConfig,
    FetchDataResponse,
    SaveItemMutationParams,
} from '../../Interfaces/useFetchByType.types';

const getQueryKey = (config: FetchByTypeConfig['config']) => {
    return Object.keys(config).map(key => [(config as Record<string, ConfigItem>)[key].apiEndpoint]);
};

export const useFetchByType = (config: FetchByTypeConfig['config']) => {
    const {request} = useDataApi();

    const fetchData = async (endpoint: string) => {
        return await request('get', endpoint);
    };

    const {data: fetchedData, isLoading: loading, error, refetch: loadData} = useQuery<FetchDataResponse>({
        queryKey: getQueryKey(config),
        queryFn: async () => {
            const results: FetchDataResponse = {};
            for (const key of Object.keys(config)) {
                results[key] = await fetchData((config as Record<string, ConfigItem>)[key].apiEndpoint);
            }
            return results;
        },
        staleTime: 1000 * 60 * 10,
    });

    const deleteItemMutation = useMutation<void, Error, DeleteItemMutationParams>({
        mutationFn: async ({type, id}: DeleteItemMutationParams) => {
            const endpoint = (config as Record<string, ConfigItem>)[type].apiEndpoint;
            const url = (type === 'skills' || type === 'workExperience')
                ? `${endpoint}/${id}`
                : endpoint;
            await request('delete', url);
        },
        onSuccess: async () => {
            await loadData();
        },
    });

    const saveItemMutation = useMutation<any, Error, SaveItemMutationParams>({
        mutationFn: async ({type, id, formData, isEditing}: SaveItemMutationParams) => {
            const endpoint = (config as Record<string, ConfigItem>)[type].apiEndpoint;
            const url = (type === 'skills' || type === 'workExperience') && isEditing
                ? `${endpoint}/${id}`
                : endpoint;
            const method = isEditing ? 'put' : 'post';
            return await request(method, url, formData);
        },
        onSuccess: async () => {
            await loadData();
        },
    });

    return {
        fetchedData: fetchedData || {},
        loading,
        error,
        deleteItem: deleteItemMutation.mutateAsync,
        saveItem: saveItemMutation.mutateAsync,
        loadData,
    };
};