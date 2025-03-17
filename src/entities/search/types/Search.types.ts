import {FORM_LABELS, FORM_PARAMS} from "@entities/search";

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

export type FormLabelKeys = keyof typeof FORM_LABELS;
export type FormParamKeys = keyof typeof FORM_PARAMS;