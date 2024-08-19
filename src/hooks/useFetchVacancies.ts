// src/hooks/useFetchVacancies.ts

import { useState, useCallback, useEffect } from 'react';
import { Vacancy } from '../Interfaces/Interface.types';
import { formatAndSortVacancies } from '../utils/formaUtils';
import axios from 'axios';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';

const useFetchVacancies = (apiUrl: string) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancies = useCallback(async (url: string, token: string, errorMsg: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<Vacancy[]>(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVacancies(formatAndSortVacancies(data));
    } catch {
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVacanciesByUserId = useCallback((userId: string, token: string) => {
    fetchVacancies(`${apiUrl}/vacancies/user/${userId}`, token, 'Ошибка при получении данных вакансий по userId');
  }, [apiUrl, fetchVacancies]);

  const fetchVacanciesByProfileId = useCallback((profileId: string, token: string) => {
    fetchVacancies(`${apiUrl}/vacancies/profile/${profileId}`, token, 'Ошибка при получении данных вакансий по profileId');
  }, [apiUrl, fetchVacancies]);

  const fetchUserProfile = useCallback(async (email: string, token: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<UserProfile>(`${apiUrl}/profiles/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data; 
    } catch (error) {
      setError('Ошибка при получении данных пользователя');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  }, [fetchVacanciesByProfileId, fetchVacanciesByUserId]);

  return { vacancies, loading, error, fetchUserProfile, fetchVacanciesByUserId, fetchVacanciesByProfileId };
};

export default useFetchVacancies;
