import {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import {Errors} from "./InterfaceForm.types";
import {FormParams} from "../config/searchConfig";

export interface Vacancy {
    id: number;
    title_vacancy: string;
    url_vacancy: string;
    title_company: string;
    url_company: string;
    vacancy_status: string;
    response_date: string;
    response_date_time?: string;
    response_date_date?: string;
}

export interface VacancySubmitParams {
    token: string | null;
    email: string;
    password: string;
    position: string;
    message: string;
    vacancyUrl: string;
    setErrors: Dispatch<SetStateAction<Errors>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface VacancyHandlersParams {
    email: string;
    password: string;
    position: string;
    message: string;
    vacancyUrl: string;
    errors: Errors;
    submitHandler: (event: FormEvent) => Promise<void>;
    stopHandler: () => Promise<void>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    handleVacancyUrlChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleEmailChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handlePasswordChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handlePositionChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleMessageChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (param: FormParams) => (e: ChangeEvent<HTMLSelectElement>) => void;
}

export interface VacancyContextType {
    vacancies: Vacancy[];
    loading: boolean;
    error: string | null;
    fetchVacancies: () => Promise<void>;
    deleteVacancy: (id: number) => Promise<void>;
}

export type SortDirection = 'ascending' | 'descending';

export interface SortConfig<T> {
    key: keyof T;
    direction: SortDirection;
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

export interface UpdateVacancyAuthData {
    id: number;
    user_id: string;
    email?: string;
    password?: string;
}

export interface UpdateVacancySubmitData {
    id: number;
    user_id: string;
    position?: string;
    message?: string;
    vacancy_url?: string;
    schedule?: string;
    order_by?: string;
    search_field?: string;
    experience?: string;
    search_period?: string;
}

export interface MultipleVacancyAuthData {
    items: SearchAuthData[];
}

export interface MultipleVacancySubmitData {
    items: SearchFieldData[];
}