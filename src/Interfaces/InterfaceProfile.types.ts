import { ButtonHTMLAttributes, ChangeEvent } from "react";
import { Vacancy } from "./Interface.types";
import { OPTIONS } from "../config/formConfigs";

export interface UserProps {
  userInfo: UserProfile;
  onSignOut: () => void;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}



export interface Resume {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface ProfileProps {
  onClose: () => void;
  isOpen: boolean;
}

export interface UseProfileHandlers {
  userProfile: UserProfile | null;
  isSign: boolean;
  setIsSign: React.Dispatch<React.SetStateAction<boolean>>;
  formError: string | null;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string, passwordRepeat: string) => Promise<void>;
  handleSignOut: () => void;
  handleUpdateProfile: (updatedProfile: UserProfile) => Promise<void>;
  authLoading: boolean;
  authError: string | null;
}

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

export interface UserInfoProps {
  userInfo: UserProfile;
  onEdit: () => void;
  onSignOut: () => void;
}

// src/Interfaces/InterfaceProfile.types.ts
export interface UserChangeProps {
  userInfo: UserProfile;
  onSave: () => void;
  onCancel: () => void;
  editProfile: UserProfile;
  avatarPreview: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (onUpdateProfile: (profile: UserProfile) => void) => void;
}


export interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'close';
  isLoading?: boolean;
}

export interface RenderInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isLoading: boolean;
  type?: string;
  placeholder?: string;
}

export interface ProfileProps {
  onClose: () => void;
  isOpen: boolean;
}

export interface ImagePreviewProps {
  src: string;
  alt?: string;
}

export interface ImageUploaderProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Option {
  value: string;
  label: string;
}

export interface RenderSelectProps {
  label: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
}

export interface RenderTextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
}