import { useCallback, useEffect, useState } from 'react';
import { UserProfile } from '../Interfaces/InterfaceProfile.types';
import useFetchUserProfile from './useFetchUserProfile';

export const useUserHandlers = (initialUserInfo: UserProfile) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState<UserProfile>(initialUserInfo);
  const [avatarPreview, setAvatarPreview] = useState<string>(initialUserInfo.avatar || '');
  
  useEffect(() => {
    setEditProfile(initialUserInfo);
    setAvatarPreview(initialUserInfo.avatar || '');
  }, [initialUserInfo]);

  const { changeUserProfile } = useFetchUserProfile();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  }, []);

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setEditProfile(prevProfile => ({ ...prevProfile, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSave = useCallback(async (onUpdateProfile: (editProfile: UserProfile) => void) => {
        try {
      const updatedProfile = await changeUserProfile(editProfile);
      onUpdateProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка при сохранении профиля:', error);
    }
  }, [changeUserProfile, editProfile]);

  return {
    isEditing,
    editProfile,
    avatarPreview,
    setEditProfile,
    setIsEditing,    
    handleInputChange,
    handleAvatarChange,
    handleSave,
  };
};
