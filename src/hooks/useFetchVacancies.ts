// src/hooks/useFetchVacancies.ts

import { useState, useCallback, useEffect } from 'react';
import { Vacancy } from '../Interfaces/Interface.types';
import { formatAndSortVacancies } from '../utils/formaUtils';
import axios from 'axios';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';

const useFetchVacancies = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  const fetchVacanciesByUserId = useCallback(async () => {
    if (!userId) {
      setError('User ID is not available.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<Vacancy[]>(`${API_URL}/vacancy/${userId}`, {
        withCredentials: true
      });
      console.log('data', data);

      setVacancies(formatAndSortVacancies(data));
    } catch {
      setError('Failed to fetch vacancies.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

useEffect(() => {
    fetchVacanciesByUserId();
  }, [fetchVacanciesByUserId]);

  return { vacancies, loading, error, fetchVacanciesByUserId };

};

export default useFetchVacancies;
