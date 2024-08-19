import { Vacancy } from "./Interface.types";

export interface UserProps {
  userInfo: UserProfile;
  onSignOut: () => void;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

export interface AuthResponse {
  accessToken: string;
  email: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  updatedAt: string;
  roles: string[];
}

export interface UserProfile {
  id: number;
  email: string;
  updatedAt: string;
  roles: string[];
  avatar: string;
  firstName: string;
  lastName: string;
  balance: number;
  spinCount: number;
  successfulResponsesCount: number;
  currentStatus: string;
  resumes: Resume[];
  messages: Message[];
  responsesToApplications: Vacancy[];
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


export interface SignUpProps {
  onSignUp: (email: string, password: string, passwordRepeat: string) => void;
  error: string | null;
  loading: boolean;
}

export interface SignInProps {
  onSignIn: (email: string, password: string) => void;
  error: string | null;
  loading: boolean;
}