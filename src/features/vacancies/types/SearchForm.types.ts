import {Dispatch, SetStateAction} from 'react';
import {Errors} from "@shared/types/Base.types";
import {FormOption} from "@shared/types/Form.types";


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

export interface SearchSubmitParams {
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