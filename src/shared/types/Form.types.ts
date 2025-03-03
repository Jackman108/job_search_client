import {ChangeEvent, ReactNode} from "react";

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
    name: string;
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


export interface FormOption {
    value: string;
    label: string;
}

export interface RenderRowProps {
    label: string;
    value: ReactNode;
}