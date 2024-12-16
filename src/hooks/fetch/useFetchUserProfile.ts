// src/hooks/useFetchUserProfile.ts
import { useCallback, useState } from 'react';
import { UserProfile } from '../../Interfaces/InterfaceProfile.types';
import useApi from '../../api/api';

const useFetchUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { loading, error, request } = useApi();

  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await request('get', '/profile');
      setUserProfile(data);
      return data;
    } catch (err) {
      console.error('Error fetching user profile', err);
    }
  }, [request]);

  const changeUserProfile = useCallback(async (userProfile: UserProfile): Promise<UserProfile> => {
    try {
      const data = await request('put', '/profile', userProfile);
      setUserProfile(data);
      return data;
    } catch (err) {
      console.error('Error saving profile', err);
      throw new Error('Error saving profile');
    }
  }, [request]);

  return { loading, error, userProfile, fetchUserProfile, changeUserProfile, setUserProfile };
};

export default useFetchUserProfile;
