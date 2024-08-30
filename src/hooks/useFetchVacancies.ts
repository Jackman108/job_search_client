// src/hooks/useFetchVacancies.ts

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Vacancy } from '../Interfaces/InterfaceVacancy.types';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';
import { formatAndSortVacancies } from '../utils/formaUtils';

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
