import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Vacancy} from '../types/Vacancies.types';
import {formatAndSortData, formatDate} from '@utils/formatUtils';
import useDataApi from "@api/useDataApi";

const formatVacancy = (vacancy: Vacancy): Vacancy => ({
    ...vacancy,
    response_date_time: formatDate(vacancy.response_date).time,
    response_date_date: formatDate(vacancy.response_date).date,
});

const useFetchVacancies = () => {
    const {request} = useDataApi();
    const queryClient = useQueryClient();

    const fetchVacancies = async () => {
        const data = await request('get', '/vacancy');
        return formatAndSortData(data, formatVacancy, 'response_date');
    };

    const {data: vacancies, isLoading: loading, error, refetch: loadData} = useQuery<Vacancy[], Error>({
        queryKey: ['vacancies'],
        queryFn: fetchVacancies,
        staleTime: 1000 * 60 * 10,
    });

    const deleteVacancyMutation = useMutation<void, Error, number>({
        mutationFn: async (id: number) => {
            await request('delete', `/vacancy/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['vacancies']});
        },
        onError: (err) => {
            console.error("Ошибка удаления вакансии:", err);
        },
    });

    return {
        vacancies: vacancies || [],
        loading,
        error: error ? error.message : null,
        fetchVacancies: () => queryClient.invalidateQueries({queryKey: ['vacancies']}),
        deleteVacancy: deleteVacancyMutation.mutateAsync,
        loadData,
    };
};

export default useFetchVacancies;