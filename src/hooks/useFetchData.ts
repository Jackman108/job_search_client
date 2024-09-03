import axios from "axios";
import { API_URL } from "../config/serverConfig";

interface FetchDataForTypeResponse {
  data: any;
  error: string | null;
  notFound: boolean;
}

export const fetchDataForType = async (endpoint: string): Promise<FetchDataForTypeResponse> => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, {
      withCredentials: true,
    });
    return { data: response.data, error: null, notFound: false };
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      return { data: null, error: 'Нет данных', notFound: true };
    }
    return { data: null, error: 'Ошибка при загрузке данных', notFound: false };
  }
};
