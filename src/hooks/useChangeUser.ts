// src/hooks/changeUserProfile.ts
import axios from 'axios';
import { API_URL } from '../config/serverConfig';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';

export const changeUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
  try {
    const { data } = await axios.put<UserProfile>(
      `${API_URL}/profile/${profile.userId}`,
      profile,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.error('Ошибка при сохранении профиля:', error);
    throw new Error('Ошибка при сохранении профиля');
  }
};