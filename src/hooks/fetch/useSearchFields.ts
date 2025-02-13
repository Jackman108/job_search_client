import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import useDataApi from "../../api/useDataApi";
import {SearchFieldData} from "../../Interfaces/InterfaceVacancy.types";

const useSearchFields = () => {
    const {request} = useDataApi();
    const queryClient = useQueryClient();

    const {data: fields, isLoading, error} = useQuery<SearchFieldData[], Error>({
        queryKey: ['searchField'],
        queryFn: async () => request<SearchFieldData[]>('get', '/vacancy-field'),
        staleTime: 1000 * 60 * 10,
    });

    const createSearchField = useMutation<SearchFieldData, Error, Omit<SearchFieldData, 'id'>>({
        mutationFn: async (newSearch) => {
            return await request('post', '/vacancy-field', newSearch);
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['searchField']});
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        },
    });

    const updateSearchField = useMutation<SearchFieldData, Error, SearchFieldData>({
        mutationFn: async (updatedSearch) => {
            return await request('put', `/vacancy-field/${updatedSearch.id}`, updatedSearch);
        },
        onSuccess: async (updatedSearch) => {
            try {
                await queryClient.invalidateQueries({queryKey: ['searchField']});
                await queryClient.invalidateQueries({queryKey: ['searchFieldId', updatedSearch.id]});
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        },
    });

    const deleteSearchField = useMutation<void, Error, number>({
        mutationFn: async (id) => {
            return await request('delete', `/vacancy-field/${id}`);
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['searchField']});
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        },
    });

    return {
        fields,
        isLoading,
        error,
        createSearchField: createSearchField.mutateAsync,
        updateSearchField: updateSearchField.mutateAsync,
        deleteSearchField: deleteSearchField.mutateAsync,
    };
};


export default useSearchFields;
