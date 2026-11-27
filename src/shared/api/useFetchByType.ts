import { useMutation, useQuery } from '@tanstack/react-query';
import { useDataApi } from '@api';
import { ACTION_TYPES } from '@config';
import { useCallback } from 'react';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { shouldRetryAuthenticatedQuery } from '@shared/utils/authQueryOptions.utils';
import {
    ConfigItem,
    DeleteItemMutationParams,
    FetchByTypeConfig,
    FetchDataResponse,
    SaveItemMutationParams,
} from '@type';

const SPECIAL_TYPES = [
    ACTION_TYPES.SKILLS,
    ACTION_TYPES.EXPERIENCE,
    ACTION_TYPES.PAYMENT,
    ACTION_TYPES.SUBSCRIPTION,
    ACTION_TYPES.FEEDBACK,
    ACTION_TYPES.CRYPTO,
    ACTION_TYPES.VACANCY,
] as const;

const getQueryKey = (config: FetchByTypeConfig['config']) => {
    return Object.keys(config).map((key) => [(config as Record<string, ConfigItem>)[key].apiEndpoint]);
};

/** HH-driven tables must not sit on a 10m RQ cache after /refresh or /start. */
const LIVE_HH_ENDPOINTS = new Set(['/feedback', '/vacancy']);

function isLiveHhConfig(config: FetchByTypeConfig['config']): boolean {
    return Object.values(config as Record<string, ConfigItem>).some((item) => LIVE_HH_ENDPOINTS.has(item.apiEndpoint));
}

export const useFetchByType = (config: FetchByTypeConfig['config']) => {
    const { request } = useDataApi();
    const { token } = useAuth();
    const liveHh = isLiveHhConfig(config);

    const fetchData = useCallback(
        async (endpoint: string) => {
            return await request('get', endpoint);
        },
        [request],
    );

    const {
        data: fetchedData,
        isLoading: loading,
        error,
        refetch: loadData,
    } = useQuery<FetchDataResponse>({
        queryKey: getQueryKey(config),
        queryFn: async () => {
            const results: FetchDataResponse = {};
            for (const key of Object.keys(config)) {
                results[key] = await fetchData((config as Record<string, ConfigItem>)[key].apiEndpoint);
            }
            return results;
        },
        enabled: !!token,
        // Feedback/vacancies change under getFeedback/sendFeedback; 10m stale + no focus
        // refetch left the «Обратная связь» table looking frozen after a successful refresh.
        staleTime: liveHh ? 0 : 1000 * 60 * 10,
        refetchOnMount: liveHh ? 'always' : true,
        refetchOnWindowFocus: liveHh,
        retry: shouldRetryAuthenticatedQuery,
    });

    const deleteItemMutation = useMutation<void, Error, DeleteItemMutationParams>({
        mutationFn: async ({ type, id }: DeleteItemMutationParams) => {
            const endpoint = (config as Record<string, ConfigItem>)[type].apiEndpoint;
            const url = (SPECIAL_TYPES as readonly string[]).includes(type) ? `${endpoint}/${id}` : endpoint;
            await request('delete', url);
        },
        onSuccess: async () => {
            await loadData();
        },
    });

    const saveItemMutation = useMutation<any, Error, SaveItemMutationParams>({
        mutationFn: async ({ type, id, formData, isEditing }: SaveItemMutationParams) => {
            const endpoint = (config as Record<string, ConfigItem>)[type].apiEndpoint;
            const url =
                (SPECIAL_TYPES as readonly string[]).includes(type) && isEditing ? `${endpoint}/${id}` : endpoint;
            const method = isEditing ? 'put' : 'post';
            return await request(method, url, formData);
        },
        onSuccess: async (data) => {
            await loadData();
            return data;
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
