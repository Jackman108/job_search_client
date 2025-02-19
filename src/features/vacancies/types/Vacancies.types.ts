import {Dispatch, SetStateAction} from "react";
import {Errors} from "@shared/types/Base.types";

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

export type SortDirection = 'ascending' | 'descending';

export interface SortConfig<T> {
    key: keyof T;
    direction: SortDirection;
}


