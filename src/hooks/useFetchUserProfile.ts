import { useState, useCallback } from 'react';
import axios from 'axios';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';

const useFetchUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchUserProfile = useCallback(async (email: string) => {
    if (!token) return null;
    setLoading(true);
    try {
      const { data } = await axios.get<UserProfile>(`${API_URL}/profiles/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUserProfile(data);
      return data;
    } catch {
      setError('Ошибка при получении данных пользователя');
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { userProfile, loading, error, fetchUserProfile };
};

export default useFetchUserProfile;
