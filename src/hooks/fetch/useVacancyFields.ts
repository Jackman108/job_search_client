import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import useDataApi from "../../api/useDataApi";
import {VacancyFieldData} from "../../Interfaces/InterfaceVacancy.types";

const useVacancyFields = () => {
    const {request} = useDataApi();
    const queryClient = useQueryClient();

    const {data: fields, isLoading, error} = useQuery<VacancyFieldData[], Error>({
        queryKey: ['vacanciesField'],
        queryFn: async () => request<VacancyFieldData[]>('get', '/vacancy-field'),
        staleTime: 1000 * 60 * 10,
    });

    const createField = useMutation<VacancyFieldData, Error, Omit<VacancyFieldData, 'id'>>({
        mutationFn: async (newField) => {
            return await request('post', '/vacancy-field', newField);
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['vacanciesField']});
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        },
    });

    const updateField = useMutation<VacancyFieldData, Error, VacancyFieldData>({
        mutationFn: async (updatedField) => {
            return await request('put', `/vacancy-field/${updatedField.id}`, updatedField);
        },
        onSuccess: async (updatedField) => {
            try {
                await queryClient.invalidateQueries({queryKey: ['vacanciesSubmit']});
                await queryClient.invalidateQueries({queryKey: ['vacancySubmit', updatedField.id]});
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        },
    });

    const deleteField = useMutation<void, Error, string>({
        mutationFn: async (id) => {
            return await request('delete', `/vacancy-field/${id}`);
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['vacanciesField']});
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        },
    });

    return {
        fields,
        isLoading,
        error,
        createVacancy: createField.mutateAsync,
        updateVacancy: updateField.mutateAsync,
        deleteVacancy: deleteField.mutateAsync,
    };
};


export default useVacancyFields;
