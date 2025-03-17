import {ChangeEvent} from "react";
import {UserProfile} from "@entities/profile";

export interface UseProfileHandlersProps {
    userProfile: UserProfile | null;
    handleUpdateProfile: (updatedProfile: UserProfile) => Promise<void>;
    profileLoading: boolean;
    profileError: Error | null;
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
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}