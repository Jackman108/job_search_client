import {ChangeEvent, Dispatch, ReactNode, SetStateAction} from 'react';

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
    options?: readonly FormOption[]
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    isLoading: boolean;
    required?: boolean;
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

export interface FormOption {
    value: string;
    label: string;
}

export interface RenderRowProps {
    label: string;
    value: string | number;
}

export interface FormValues {
    email: string;
    password: string;
    position: string;
    message: string;
    vacancyUrl: string;
    schedule: string;
    orderBy: string;
    searchField: string;
    experience: string;
    searchPeriod: string;
}

export interface SubmitParams {
    email: string;
    password: string;
    position?: string;
    message?: string;
    vacancyUrl?: string;
    setErrors: Dispatch<SetStateAction<Errors>>
    setIsLoading: (loading: boolean) => void;
    endpoint: string;
}

export interface SearchAuthData {
    id?: number;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface SearchFieldData {
    id?: number;
    position: string;
    message: string;
    vacancy_url: string;
    schedule: string;
    order_by: string;
    search_field: string;
    experience: string;
    search_period: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FormContainerProps {
    token: string | null;
    onClose: () => void;
    children: ReactNode;
}

export interface ManagementSectionProps {
    title: string;
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
    items: { id: number | undefined; label: string }[];
    onCreate: () => void;
    onUpdate: () => void;
    onDelete: () => void;
    disabled?: boolean;
}

export interface FormFieldConfig {
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
}


export interface FormConfig {
    fields: Record<string, FormFieldConfig>;
    options: Record<string, FormOption[]>;
}