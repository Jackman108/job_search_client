import {ChangeEvent} from "react";

export interface UserProfile {
    id: string;
    email: string;
    updatedAt: string;
    userId: string;
    firstName: string;
    lastName: string;
    avatar: string;
    balance: number;
    spinCount: number;
    successfulResponsesCount: number;
    currentStatus: string;
}

export interface UseProfileHandlers {
    userProfile: UserProfile | null;
    handleUpdateProfile: (updatedProfile: UserProfile) => Promise<void>;
}

export interface UserInfoProps {
    userInfo: UserProfile;
    onEdit: () => void;
    onSignOut: () => void;
}

export interface UserChangeProps {
    onSave: () => void;
    onCancel: () => void;
    editProfile: UserProfile;
    avatarPreview: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}