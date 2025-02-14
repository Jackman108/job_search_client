import {useMutation, useQuery} from '@tanstack/react-query';
import {ConfigItem} from '../../Interfaces/InterfaceResume.types';
import useDataApi from "../../api/useDataApi";

export const useFetchById = (config: ConfigItem) => {
    const {request} = useDataApi();
    const apiEndpoint = config.apiEndpoint ? config.apiEndpoint() : null;
    const queryKey = [config.title, apiEndpoint];

    const {
        data: fetchedData, isPending, error, refetch: loadData,
    } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            if (!config.apiEndpoint) return [];
            return await request('get', config.apiEndpoint());
        },
        staleTime: 1000 * 60 * 10,
    });

    const deleteItemMutation = useMutation({
        mutationFn: async (id: number) => {
            await request('delete', `${config.apiEndpoint()}/${id}`);
        },
        onSuccess: async () => {
            await loadData();
        },
    });

    const saveItemMutation = useMutation({
        mutationFn: async ({id, formData, isEditing}: { id: number, formData: any, isEditing: boolean }) => {
            const method = isEditing ? 'put' : 'post';
            const url = `${config.apiEndpoint()}/${id}`;
            return await request(method, url, formData);
        },
        onSuccess: async () => {
            await loadData();
        },


    });


    return {
        fetchedData: fetchedData || [],
        loading: isPending,
        error,
        deleteItem: deleteItemMutation.mutateAsync,
        saveItem: saveItemMutation.mutateAsync,
        loadData
    };
};
