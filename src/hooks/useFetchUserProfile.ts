// src/hooks/useFetchUserProfile.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';
import { API_URL } from '../config/serverConfig';
import { useAuth } from '../context/useAuthContext';
import useApi from '../api/api';

const useFetchUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { loading, error, request } = useApi();

  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await request('get', '/profile');      
      setUserProfile(data);
      return data;
    } catch {
    }
  }, [request]);

  const changeUserProfile = useCallback(async (userProfile: UserProfile): Promise<UserProfile> => {
    try {
      const data = await request('put', '/profile', userProfile);
      setUserProfile(data);
      return data;
    } catch (error) {
      throw new Error('Error saving profile');
    }
  }, [request]);
  
  return { loading, error, userProfile, fetchUserProfile, changeUserProfile, };
};

export default useFetchUserProfile;
