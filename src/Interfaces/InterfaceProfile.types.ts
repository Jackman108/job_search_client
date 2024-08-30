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

export interface UserProps {
  userInfo: UserProfile;
  onSignOut: () => void;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
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

export interface UserInfoProps {
  userInfo: UserProfile;
  onEdit: () => void;
  onSignOut: () => void;
}

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
