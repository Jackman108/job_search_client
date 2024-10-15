// useFetchData.ts
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../config/serverConfig';

interface FetchDataForTypeResponse<T = any> {
  data: T | null;
  error: string | null;
  notFound: boolean;
}

const handleRequest = async <T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<FetchDataForTypeResponse<T>> => {
    try {
    const response = await request();
    return { data: response.data, error: null, notFound: false };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return { data: null, error: 'Нет данных', notFound: true };
    }
    return { data: null, error: 'Ошибка при выполнении запроса', notFound: false };
  }
};
export const fetchDataForType = async <T = any>(
  endpoint: string
): Promise<FetchDataForTypeResponse<T>> =>
  handleRequest(() => axios.get<T>(`${API_URL}${endpoint}`, { withCredentials: true }));

export const createDataForType = async <T = any>(
  endpoint: string,
  data: T
): Promise<FetchDataForTypeResponse<T>> =>
  handleRequest(() => axios.post<T>(`${API_URL}${endpoint}`, data, { withCredentials: true }));

export const updateDataForType = async <T = any>(
  endpoint: string,
  data: T
): Promise<FetchDataForTypeResponse<T>> =>
  handleRequest(() => axios.put<T>(`${API_URL}${endpoint}`, data, { withCredentials: true }));

export const deleteDataForType = async (
  endpoint: string
): Promise<FetchDataForTypeResponse<null>> =>
  handleRequest(() => axios.delete(`${API_URL}${endpoint}`, { withCredentials: true }))