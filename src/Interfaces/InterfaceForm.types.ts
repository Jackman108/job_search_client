import {ChangeEvent, Dispatch, FormEvent, SetStateAction} from 'react';

export interface Errors {
    [key: string]: string | undefined;
}

export interface HandleFeedbackParams {
    token: string | null;
    email: string;
    password: string;
    setErrors: Dispatch<SetStateAction<Errors>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}


export interface UseFeedbackHandlersParams {
    email: string;
    password: string;
    errors: Errors;
    feedbackHandler: (event: FormEvent) => Promise<void>;
    feedbackStopHandler: () => Promise<void>;
    isLoading: boolean | null;
    handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ValidationSearchUrl {
    isValidSearchUrl: boolean;
    searchUrlError: Errors;
}

export interface ValidationEmail {
    isValidEmail: boolean;
    emailError: Errors;
}

export interface ValidationPassword {
    isValidPassword: boolean;
    passwordError: Errors;
}

export interface FormattedDate {
    time: string;
    date: string;
}

export interface RenderInputProps {
    id?: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    error?: string;
    isLoading: boolean;
    type?: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
    autoComplete?: string;
}

export interface RenderSelectProps {
    label: string;
    options: Option[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    isLoading: boolean;
}

export interface RenderTextareaProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    isLoading: boolean;
}

export interface ProfileProps {
    onClose: () => void;
    isOpen: boolean;
}

export interface Option {
    value: string;
    label: string;
}

export interface RenderRowProps {
    label: string;
    value: string | number;
}
