export interface AuthResponse {
    accessToken: string;
}

export interface RegisterResponse {
    id: string;
    email: string;
    updatedAt: string;
    roles: string[];
}

export interface AuthSwitchProps {
    isSign: boolean;
    setIsSign: (value: boolean) => void;
}

export interface SignUpProps {
    onSignUp: (email: string, password: string, passwordRepeat: string) => void;
    error: string | Error | null;
    loading: boolean;
}

export interface SignInProps {
    onSignIn: (email: string, password: string) => void;
    error: string | Error | null;
    loading: boolean;
}

