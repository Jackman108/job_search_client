import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {profileConfig, UserProfile} from "@entities/profile";
import {useFetchByType} from "@api";
import {useFormState} from "@hooks";

export const useProfileForm = (initialUserInfo: UserProfile) => {
    const {
        formData,
        setFormData,
        isEditing,
        handleEditClick,
        handleCancelClick
    } = useFormState<UserProfile>(initialUserInfo);

    const [avatarPreview, setAvatarPreview] = useState<string>(initialUserInfo.avatar || '');

    const {saveItem: saveProfile} = useFetchByType(profileConfig);

    const prevInitialUserInfo = useRef(JSON.stringify(initialUserInfo));

    useEffect(() => {
        if (prevInitialUserInfo.current !== JSON.stringify(initialUserInfo)) {
            setFormData(initialUserInfo);
            setAvatarPreview(initialUserInfo.avatar || '');
            prevInitialUserInfo.current = JSON.stringify(initialUserInfo);
        }
    }, [initialUserInfo, setFormData]);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevProfile => ({...prevProfile, [name]: value}));
    }, [setFormData]);

    const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                setFormData(prevProfile => ({...prevProfile, avatar: reader.result as string}));
            };
            reader.readAsDataURL(file);
        }
    }, [setFormData]);

    const handleSave = useCallback(async (onUpdateProfile: (editProfile: UserProfile) => void) => {
        if (JSON.stringify(formData) === prevInitialUserInfo.current) {
            handleCancelClick('profile');
            return;
        }
        try {
            const updatedProfile = await saveProfile({
                type: 'profile',
                id: formData.id,
                formData: formData,
                isEditing: true,
            });
            onUpdateProfile(updatedProfile);
            handleCancelClick('profile');
        } catch (error) {
            console.error('Ошибка при сохранении профиля:', error);
        }
    }, [saveProfile, formData, handleCancelClick]);

    return {
        isEditing: isEditing['profile'] || false,
        editProfile: formData as UserProfile,
        avatarPreview,
        setIsEditing: () => handleEditClick('profile', initialUserInfo),
        handleCancel: () => handleCancelClick('profile'),
        handleInputChange,
        handleAvatarChange,
        handleSave,
    };
};
