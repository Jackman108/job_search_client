import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDataApi } from "@api";
import { SearchAuthData } from "@entities/search";

const useSearchAuth = () => {
    const queryClient = useQueryClient();
    const { request } = useDataApi();

    const { data: auths, isLoading, error } = useQuery<SearchAuthData[], Error>({
        queryKey: ['searchAuth'],
        queryFn: async () => request('get', '/vacancy-auth'),
        staleTime: 1000 * 60 * 10,
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
            return await request('put', `/vacancy-auth/${updatedSearch.id}`, updatedSearch);
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