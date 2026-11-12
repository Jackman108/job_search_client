import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDataApi } from '@api';
import { SearchAuthData } from '@entities/search';
import { useAuth } from '@app/providers/auth/useAuthContext';
import { shouldRetryAuthenticatedQuery } from '@shared/utils/authQueryOptions.utils';

const useSearchAuth = () => {
    const queryClient = useQueryClient();
    const { request } = useDataApi();
    const { token } = useAuth();

    const {
        data: auths,
        isLoading,
        error,
    } = useQuery<SearchAuthData[], Error>({
        queryKey: ['searchAuth'],
        queryFn: async () => request('get', '/vacancy-auth'),
        enabled: !!token,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: shouldRetryAuthenticatedQuery,
    });

    const createSearchAuth = useMutation<SearchAuthData, Error, Omit<SearchAuthData, 'id'>>({
        mutationFn: async (newSearch) => {
            return await request('post', '/vacancy-auth', newSearch);
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({ queryKey: ['searchAuth'] });
            } catch (error) {
                console.error('Error updating data:', error);
            }
        },
    });

    const updateSearchAuth = useMutation<SearchAuthData, Error, SearchAuthData>({
        mutationFn: async (updatedSearch) => {
            const { password, ...rest } = updatedSearch;
            const body = typeof password === 'string' && password.trim() === '' ? rest : { ...rest, password };
            return await request('put', `/vacancy-auth/${updatedSearch.id}`, body);
        },
        onSuccess: async (updatedSearch) => {
            try {
                await queryClient.invalidateQueries({ queryKey: ['searchAuth'] });
                await queryClient.invalidateQueries({ queryKey: ['searchAuthId', updatedSearch.id] });
            } catch (error) {
                console.error('Error updating data:', error);
            }
        },
    });

    const deleteSearchAuth = useMutation<void, Error, number>({
        mutationFn: async (id) => {
            return await request('delete', `/vacancy-auth/${id}`);
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({ queryKey: ['searchAuth'] });
            } catch (error) {
                console.error('Error updating data:', error);
            }
        },
    });

    return {
        auths,
        isLoading,
        error,
        createSearchAuth: createSearchAuth.mutateAsync,
        updateSearchAuth: updateSearchAuth.mutateAsync,
        deleteSearchAuth: deleteSearchAuth.mutateAsync,
    };
};

export default useSearchAuth;
