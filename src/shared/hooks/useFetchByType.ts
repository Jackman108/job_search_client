import {useMutation, useQuery} from '@tanstack/react-query';
import {
    ConfigItem,
    DeleteItemMutationParams,
    FetchByTypeConfig,
    FetchDataResponse,
    SaveItemMutationParams
} from '@features/resume/types/InterfaceResume.types';
import useDataApi from '@api/useDataApi';
import {ACTION_TYPES} from "@config/actionTypes";

const SPECIAL_TYPES = [ACTION_TYPES.SKILLS, ACTION_TYPES.EXPERIENCE, ACTION_TYPES.PAYMENT, ACTION_TYPES.SUBSCRIPTION] as const;

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
            const url = (SPECIAL_TYPES as readonly string[]).includes(type)
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
            const url = (SPECIAL_TYPES as readonly string[]).includes(type) && isEditing
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