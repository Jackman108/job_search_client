// src/hooks/useFetchAuth.ts

import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL, AUTH_URL } from '../config/serverConfig';
import { AuthResponse, RegisterResponse } from '../Interfaces/InterfaceAuth.types';
import { decodeToken, isTokenExpired } from '../utils/tokenUtils';
import { useAuth } from '../context/useAuthContext';

const useFetchAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUserId, setToken, } = useAuth();


  const handleError = useCallback((message: string) => {
    setError(message);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post<AuthResponse>(`${AUTH_URL}/auth/login`, {
        email,
        password,
      });
      setToken(data.accessToken);

      const decodedToken = decodeToken(data.accessToken);
      console.log('Decoded token:', decodedToken);

      if (isTokenExpired(decodedToken.exp)) {
        throw new Error('Токен истек');
      }
      setUserId(decodedToken.id);      
    } catch {
      handleError('Ошибка при входе');      
    } finally {
      setLoading(false);
    }
  }, [ setUserId, setToken, handleError]);

  const register = useCallback(async (email: string, password: string, passwordRepeat: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post<RegisterResponse>(`${AUTH_URL}/auth/register`, {
        email,
        password,
        passwordRepeat,
      });
      console.log('Data:', data);
      setUserId(data.id);
      
      const profileData = { userId: data.id }
      await axios.post(`${API_URL}/profile`, profileData);
      } catch {
      handleError('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  }, [handleError, setUserId]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await axios.get(`${AUTH_URL}/auth/logout`, { withCredentials: true });
      setUserId(null);
      setToken(null);  
    } catch (error) {
      console.error('Ошибка при выходе', error);
    } finally {
      setLoading(false);
    }
  }, [setToken, setUserId]);

  return { login, register, logout, loading, error};
};

export default useFetchAuth;
