import {ChangeEvent} from "react";

export interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    balance: number;
    spin_count: number;
    successful_responses_count: number;
    current_status: string;
    user_id: string | number;
    updated_at: string | Date;
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