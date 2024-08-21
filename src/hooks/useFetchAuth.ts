// src/hooks/useFetchAuth.ts

import { useState, useCallback } from 'react';
import axios from 'axios';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';
import useFetchUserProfile from './useFetchUserProfile';
import { AUTH_URL } from '../config/serverConfig';
import { AuthResponse, RegisterResponse } from '../Interfaces/InterfaceAuth.types';

const useFetchAuth = () => {
  const { fetchUserProfile } = useFetchUserProfile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const setUserId = (userId: number) => localStorage.setItem('userId', userId.toString());
  const removeUserId = () => localStorage.removeItem('userId');

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
      setCurrentUser(await fetchUserProfile(email));
    } catch {
      handleError('Ошибка при входе');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, [fetchUserProfile, setToken, handleError]);

  const register = useCallback(async (email: string, password: string, passwordRepeat: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post<RegisterResponse>(`${AUTH_URL}/auth/register`, {
        email,
        password,
        passwordRepeat,
      });
      setUserId(data.id);
      await login(email, password);
    } catch {
      handleError('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  }, [login, setToken, handleError]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await axios.get(`${AUTH_URL}/auth/logout`, { withCredentials: true });
      removeUserId();
      removeToken();
      setCurrentUser(null);
    } catch (error) {
      console.error('Ошибка при выходе', error);
    } finally {
      setLoading(false);
    }
  }, [removeUserId, removeToken]);

  return { login, register, logout, loading, error, currentUser, fetchUserProfile };
};

export default useFetchAuth;
