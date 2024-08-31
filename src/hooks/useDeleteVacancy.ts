// src/hooks/useDeleteVacancy.ts
import axios from 'axios';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';

const useDeleteVacancy = () => {
    const { userProfile } = useAuth();

    const deleteVacancy = async (id: number) => {
        if (!userProfile) throw new Error('Пользователь не авторизован');
        try {
            await axios.delete(`${API_URL}/vacancy/${userProfile.userId}/${id}`, { withCredentials: true });
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
