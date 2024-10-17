// src/hooks/useFetchAuth.ts
import axios from 'axios';
import { useCallback, useState } from 'react';
import { AuthResponse, RegisterResponse } from '../Interfaces/InterfaceAuth.types';
import { API_URL, AUTH_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';
import { decodeToken, isTokenExpired } from '../utils/tokenUtils';

const useFetchAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUserId, setToken } = useAuth();

  const handleError = useCallback((message: string) => {
    setError(message);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.post<AuthResponse>(`${AUTH_URL}/auth/login`, { email, password });
      setToken(data.accessToken);
      const decodedToken = decodeToken(data.accessToken);
      if (isTokenExpired(decodedToken.exp)) { throw new Error('Токен истек'); }
      setUserId(decodedToken.id);
    } catch {
      handleError('Ошибка при входе');
    } finally {
      setLoading(false);
    }
  }, [loading, setUserId, setToken, handleError]);

  const register = useCallback(async (email: string, password: string, passwordRepeat: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.post<RegisterResponse>(`${AUTH_URL}/auth/register`, { email, password, passwordRepeat });
      setUserId(data.id);
      await axios.post(`${API_URL}/profile`, { userId: data.id });
    } catch {
      handleError('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  }, [loading, handleError, setUserId]);

  const logout = useCallback(async () => {
    if (loading) return;
    setUserId(null);
    setToken(null);
    setLoading(true);
    try {
      await axios.get(`${AUTH_URL}/auth/logout`, { withCredentials: true });
    } catch (error) {
      handleError('Ошибка при выходе');
    } finally {
      setLoading(false);
    }
  }, [loading, setToken, setUserId, handleError]);

  return { login, register, logout, loading, error };
};

export default useFetchAuth;
