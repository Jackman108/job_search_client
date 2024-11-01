// src/hooks/useFetchVacancies.ts
import { useCallback, useEffect, useState } from 'react';
import { Vacancy } from '../Interfaces/InterfaceVacancy.types';
import useApi from '../api/api';
import { formatAndSortVacancies } from '../utils/formatUtils';

const useFetchVacancies = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const { loading, error, request } = useApi();

  const fetchVacancies = useCallback(async () => {
    try {
      const data = await request('get', '/vacancy');
      setVacancies(formatAndSortVacancies(data));
    } catch { }
  }, [request]);

  const deleteVacancy = useCallback(async (id: number) => {
    try {
      await request('delete', `/vacancy/${id}`);
      setVacancies((prevVacancies) => prevVacancies.filter((vacancy) => vacancy.id !== id));
    } catch { }
  }, [request]);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  return { vacancies, loading, error, fetchVacancies, deleteVacancy };

};

export default useFetchVacancies;
