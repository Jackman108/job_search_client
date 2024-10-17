// src/hooks/useDeleteVacancy.ts
import axios from 'axios';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';
import { Vacancy } from '../Interfaces/InterfaceVacancy.types';

const useDeleteVacancy = () => {
    const { token } = useAuth();

    const deleteVacancy = async (id: number) => {
        if (!token) throw new Error('Пользователь не авторизован');
        try {
            await axios.delete<Vacancy>(`${API_URL}/vacancy/${id}`, {
                headers: { Authorization:  token },
                withCredentials: true
              });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Ошибка при удалении вакансии: ${error.message}`);
            } else {
                throw new Error('Неизвестная ошибка при удалении вакансии.');
            }
        }
    };

    return { deleteVacancy };
};

export default useDeleteVacancy;
