import {ChangeEvent} from "react";
import {UserProfile} from "@entities/profile";

export interface UseProfileHandlersProps {
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