import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {VacancyAuthData} from "../../Interfaces/InterfaceVacancy.types";
import useDataApi from "../../api/useDataApi";

const useVacancyAuth = () => {
    const queryClient = useQueryClient();
    const {request} = useDataApi();

    const {data: vacancies, isLoading, error} = useQuery<VacancyAuthData[], Error>({
        queryKey: ['vacanciesAuth'],
        queryFn: async () => request('get', '/vacancy-auth'),
        staleTime: 1000 * 60 * 10,
    });

    const createVacancy = useMutation<VacancyAuthData, Error, Omit<VacancyAuthData, 'id'>>({
        mutationFn: async (newVacancy) => {
            return await request('post', '/vacancy-auth', newVacancy);
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['vacanciesAuth']});
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        },
    });

    const updateVacancy = useMutation<VacancyAuthData, Error, VacancyAuthData>({
        mutationFn: async (updatedVacancy) => {
            return await request('put', `/vacancy-auth/${updatedVacancy.id}`, updatedVacancy);
        },
        onSuccess: async (updatedVacancy) => {
            try {
                await queryClient.invalidateQueries({queryKey: ['vacanciesAuth']});
                await queryClient.invalidateQueries({queryKey: ['vacancyAuth', updatedVacancy.id]}); // Используем updatedVacancy
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        },
    });

    const deleteVacancy = useMutation<void, Error, string>({
        mutationFn: async (id) => {
            return await request('delete', `/vacancy-auth/${id}`);
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['vacanciesAuth']});
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        },
    });

    return {
        vacancies,
        isLoading,
        error,
        createVacancy: createVacancy.mutateAsync,
        updateVacancy: updateVacancy.mutateAsync,
        deleteVacancy: deleteVacancy.mutateAsync,
    };
};

export default useVacancyAuth;