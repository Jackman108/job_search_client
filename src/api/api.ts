import axios from 'axios';
import { useState, useCallback } from 'react';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const useApi = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (method: 'get' | 'post' | 'put' | 'delete', endpoint: string, data?: any) => {
      setLoading(true);
      setError(null);
      try {
        const config = {
          headers: { Authorization: token },
        };
        const response = await axiosInstance.request({
          method,
          url: endpoint,
          data,
          ...config,
        });
        return response.data;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        throw err; 
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { loading, error, request };
};

export default useApi;
