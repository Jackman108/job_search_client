// src/hooks/handleSave.ts
import axios from 'axios';
import { API_URL } from '../config/serverConfig';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';

export const useChangeUserProfile = () => {

  const changeUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
    if (!profile || !profile.userId) {
      throw new Error('Не удалось определить ID пользователя.');
    }

    try {
      console.log('Updating profile:', profile);
      const { data } = await axios.put<UserProfile>(
        `${API_URL}/profile/${profile.userId}`,
        profile,
        {
          withCredentials: true,
        }
      );
      console.log('profile:', data);
      return data;
    } catch (error) {
      console.error('Ошибка при сохранении профиля:', error);
      throw new Error('Ошибка при сохранении профиля');
    }
  };
  return { changeUserProfile };
};