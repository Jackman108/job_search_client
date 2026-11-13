import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Errors } from '@type';
import { Vacancy } from '@entities/vacancy';
import { Feedback } from '@entities/feedback';

export interface VacancySubmitParams {
    token: string | null;
    email: string;
    password: string;
    position: string;
    message: string;
    vacancyUrl: string;
    dryRun?: boolean;
    applyCap?: number;
    setErrors: Dispatch<SetStateAction<Errors>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
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
