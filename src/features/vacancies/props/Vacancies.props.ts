import {Dispatch, MouseEvent, SetStateAction} from "react";
import {Errors} from "@type";
import {Vacancy} from "@entities/vacancy";
import {Feedback} from "@entities/feedback";

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

export interface VacancyHeaderProps {
    handleSort: (key: keyof Vacancy) => void;
    getSortArrow: (key: keyof Vacancy) => string;
}

export interface VacancyRowProps {
    vacancy: Vacancy;
    feedback?: Feedback;
    onMouseEnter: (e: MouseEvent<HTMLElement>, feedbackText: string | null) => void;
    onMouseLeave: () => void;
    onDelete: (id: number) => void;
}