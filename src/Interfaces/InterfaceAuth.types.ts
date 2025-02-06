import { Dispatch, SetStateAction } from "react";

export interface AuthResponse {
  accessToken: string;
  email: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  updatedAt: string;
  roles: string[];
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

export interface AuthContextProps {
  token: string | null;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}