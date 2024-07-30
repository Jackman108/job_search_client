// src/hooks/useFetchVacancies.ts

import { useState, useCallback, useEffect } from 'react';
import { Vacancy } from '../Interfaces/Interface.types';
import { formatDate } from '../utils/dateUtils';
import axios from 'axios';

const useFetchVacancies = (apiUrl: string) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/data`);
      const formattedVacancies = response.data.map((vacancy: Vacancy) => ({
        ...vacancy,
        response_date_time: formatDate(vacancy.response_date).time,
        response_date_date: formatDate(vacancy.response_date).date,
      }));

      const sortedVacancies = formattedVacancies.sort((a: Vacancy, b: Vacancy) =>
        new Date(b.response_date).getTime() - new Date(a.response_date).getTime()
      );
      setVacancies(sortedVacancies);
    } catch (error) {
      setError('Ошибка при получении данных');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  return { vacancies, loading, error, fetchVacancies };
};

export default useFetchVacancies;
