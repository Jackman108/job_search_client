// src/hooks/useFetchUserProfile.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';

const useFetchUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userId, setUserProfile} = useAuth();

  const fetchUserProfile = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const { data } = await axios.get<UserProfile>(`${API_URL}/profile/${userId}`, {
        withCredentials: true,
      });
      setUserProfile(data);
      return data;
    } catch (err) {
      setError('Ошибка при получении данных пользователя');
    } finally {
      setLoading(false);
    }
  }, [userId, setUserProfile]);

  return { loading, error, fetchUserProfile };
};

export default useFetchUserProfile;
