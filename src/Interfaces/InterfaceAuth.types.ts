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
  userId: number | null;
  token: string | null;
  setUserId: (id: number | null) => void;
  setToken: (token: string | null) => void;
}