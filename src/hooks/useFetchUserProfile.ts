// src/hooks/useFetchUserProfile.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';

const useFetchUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { token } = useAuth();

  const fetchUserProfile = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<UserProfile>(`${API_URL}/profile`, {
        headers: { Authorization: token },
        withCredentials: true
      });
      setUserProfile(data);
      return data;
    } catch (err) {
      setError('Ошибка при получении данных пользователя');
    } finally {
      setLoading(false);
    }
  }, [token, setUserProfile]);

  const changeUserProfile = useCallback(async (userProfile: UserProfile): Promise<UserProfile> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put<UserProfile>(`${API_URL}/profile`, userProfile);
      console.log(userProfile)
      setUserProfile(data);
      return data;
    } catch (error) {
      setError('Ошибка при сохранении профиля');
      throw error;
    } finally {
      setLoading(false);
    }
  },
    [setUserProfile]
  );

  return { loading, error, userProfile, fetchUserProfile, changeUserProfile, };
};

export default useFetchUserProfile;
