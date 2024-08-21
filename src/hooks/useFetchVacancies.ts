// src/hooks/useFetchVacancies.ts

import { useState, useCallback, useEffect } from 'react';
import { Vacancy } from '../Interfaces/Interface.types';
import { formatAndSortVacancies } from '../utils/formaUtils';
import axios from 'axios';
import { useAuth } from '../context/useAuthContext';

const useFetchVacancies = (apiUrl: string) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, token } = useAuth();

  const fetchVacancies = useCallback(async (url: string, errorMsg: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<Vacancy[]>(url, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setVacancies(formatAndSortVacancies(data));
    } catch {
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchVacanciesByUserId = useCallback(() => {
    if (userId) {
      fetchVacancies(`${apiUrl}/vacancies/user/${userId}`, 'Ошибка при получении данных вакансий по userId');
    }
  }, [apiUrl, fetchVacancies, userId]);  

  return { vacancies, loading, error, fetchVacanciesByUserId };
};

export default useFetchVacancies;
