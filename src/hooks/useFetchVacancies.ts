// src/hooks/useFetchVacancies.ts

import { useState, useCallback, useEffect } from 'react';
import { Vacancy } from '../Interfaces/Interface.types';
import { formatAndSortVacancies } from '../utils/formaUtils';
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
      setVacancies(formatAndSortVacancies(response.data));
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
