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
  const { token } = useAuth();

  const fetchVacancies = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<Vacancy[]>(`${API_URL}/vacancy`, {
        headers: { Authorization:  token },
        withCredentials: true
      });
      setVacancies(formatAndSortVacancies(data));
    } catch {
      setError('Failed to fetch vacancies.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  return { vacancies, loading, error, fetchVacancies };

};

export default useFetchVacancies;
