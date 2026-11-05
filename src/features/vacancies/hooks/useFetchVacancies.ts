import { useFetchByType } from '@api';
import { ACTION_TYPES } from '@config';
import { Vacancy } from '@entities/vacancy';
import { vacancyConfig } from '@entities/vacancy/config/vacancyConfig';
import { formatAndSortData, formatDate } from '@utils';
import { useCallback } from 'react';

const formatVacancy = (vacancy: Vacancy): Vacancy => ({
    ...vacancy,
    response_date_time: formatDate(vacancy.response_date).time,
    response_date_date: formatDate(vacancy.response_date).date,
});


const useFetchVacancies = () => {
    const { fetchedData, loading, error, deleteItem, saveItem, loadData } = useFetchByType(vacancyConfig);

    const vacancies: Vacancy[] = fetchedData.vacancy
        ? formatAndSortData(fetchedData.vacancy, formatVacancy, 'response_date')
        : [];

    const deleteVacancy = useCallback(
        async (id: number) => {
            await deleteItem({ type: ACTION_TYPES.VACANCY, id });
        },
        [deleteItem]
    );

    const saveVacancy = useCallback(
        async (formData: Partial<Vacancy>, isEditing: boolean, id?: number) => {
            await saveItem({ type: ACTION_TYPES.VACANCY, id, formData, isEditing });
        },
        [saveItem]
    );

    return { vacancies, loading, error, deleteVacancy, saveVacancy, loadData };
};

export default useFetchVacancies;