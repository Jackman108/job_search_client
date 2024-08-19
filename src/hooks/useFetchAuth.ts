// src/hooks/useFetchAuth.ts

import { useState, useCallback } from 'react';
import axios from 'axios';
import { AuthResponse, RegisterResponse, UserProfile } from '../Interfaces/InterfaceProfile.types';
import useFetchVacancies from './useFetchVacancies';
import { API_URL, AUTH_URL } from '../config/serverConfig';

const useFetchAuth = () => {

  const { fetchUserProfile } = useFetchVacancies(API_URL);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const setToken = (token: string) => localStorage.setItem('token', token);
  const removeToken = () => localStorage.removeItem('token');

  const handleError = (message: string) => {
    setError(message);
    setCurrentUser(null);
  };
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post<AuthResponse>(`${AUTH_URL}/auth/login`, {
        email,
        password,
      });
      setToken(data.accessToken);
      const userProfile = await fetchUserProfile(email, data.accessToken);
      setCurrentUser(userProfile);
    } catch {
      handleError('Ошибка при входе');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, [fetchUserProfile]);

  const register = useCallback(async (email: string, password: string, passwordRepeat: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post<RegisterResponse>(`${AUTH_URL}/auth/register`, {
        email,
        password,
        passwordRepeat,
      });
      setToken(data.id.toString());
      await login(email, password);   
    } catch {
      handleError('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  }, [fetchUserProfile]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await axios.get(`${AUTH_URL}/auth/logout`, { withCredentials: true });
      removeToken();
      setCurrentUser(null);
    } catch (error) {
      console.error('Ошибка при выходе', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, register, logout, loading, error, currentUser, fetchUserProfile };
};

export default useFetchAuth;
