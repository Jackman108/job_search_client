// src/hooks/useFetchVacancies.ts
import {useCallback, useEffect, useState} from 'react';
import {Vacancy} from '../../Interfaces/InterfaceVacancy.types';
import useApi from '../../api/useApi';
import {formatAndSortData, formatDate} from '../../utils/formatUtils';

const useFetchVacancies = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const {loading, error, request} = useApi();


    const formatVacancy = (vacancy: Vacancy): Vacancy => ({
        ...vacancy,
        response_date_time: formatDate(vacancy.response_date).time,
        response_date_date: formatDate(vacancy.response_date).date,
    });

    const fetchVacancies = useCallback(async () => {
        try {
            const data = await request('get', '/vacancy');
            setVacancies(formatAndSortData(data, formatVacancy, 'response_date'));
        } catch {
        }
    }, [request]);

    const deleteVacancy = useCallback(async (id: number) => {
        try {
            await request('delete', `/vacancy/${id}`);
            setVacancies((prevVacancies) => prevVacancies.filter((vacancy) => vacancy.id !== id));
        } catch {
        }
    }, [request]);

    useEffect(() => {
        fetchVacancies().catch((error) => console.error("Ошибка загрузки вакансий:", error));
    }, [fetchVacancies]);

    return {vacancies, loading, error, fetchVacancies, deleteVacancy};
};

export default useFetchVacancies;
