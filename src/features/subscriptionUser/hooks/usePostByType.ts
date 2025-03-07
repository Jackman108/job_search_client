import {useMutation} from '@tanstack/react-query';
import useDataApi from '@api/useDataApi';
import {ConfigItem, SaveItemMutationParams} from '@features/resume/types/InterfaceResume.types';

export const usePostByType = (config: Record<string, ConfigItem>) => {
    const {request} = useDataApi();

    const saveItemMutation = useMutation<any, Error, SaveItemMutationParams>({
        mutationFn: async ({type, id, formData, isEditing}: SaveItemMutationParams) => {
            const endpoint = config[type].apiEndpoint;
            const url = isEditing ? `${endpoint}/${id}` : endpoint;
            const method = isEditing ? 'put' : 'post';
            return await request(method, url, formData);
        },
    });

    return {
        saveItem: saveItemMutation.mutateAsync,
        loading: saveItemMutation.isPending,
        error: saveItemMutation.error,
    };
};