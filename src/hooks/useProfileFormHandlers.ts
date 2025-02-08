import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {UserProfile} from '../Interfaces/InterfaceProfile.types';
import useFetchUserProfile from './fetch/useFetchUserProfile';

export const useProfileFormHandlers = (initialUserInfo: UserProfile) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState<UserProfile>(initialUserInfo);
    const [avatarPreview, setAvatarPreview] = useState<string>(initialUserInfo.avatar || '');
    const {changeUserProfile} = useFetchUserProfile();

    const prevInitialUserInfo = useRef(JSON.stringify(initialUserInfo));

    useEffect(() => {
        if (prevInitialUserInfo.current !== JSON.stringify(initialUserInfo)) {
            setEditProfile(initialUserInfo);
            setAvatarPreview(initialUserInfo.avatar || '');
            setIsEditing(false);
            prevInitialUserInfo.current = JSON.stringify(initialUserInfo);
        }
    }, [initialUserInfo]);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setEditProfile(prevProfile => ({...prevProfile, [name]: value}));
    }, []);

    const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                setEditProfile(prevProfile => ({...prevProfile, avatar: reader.result as string}));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleSave = useCallback(async (onUpdateProfile: (editProfile: UserProfile) => void) => {
        if (JSON.stringify(editProfile) === prevInitialUserInfo.current) {
            setIsEditing(false);
            return;
        }
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
        setIsEditing,
        handleInputChange,
        handleAvatarChange,
        handleSave,
    };
};
