import { Vacancy } from "./Interface.types";

export interface UserProps {
  userInfo: UserProfile;
  onSignOut: () => void;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

export interface UserProfile {
  id: string;
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