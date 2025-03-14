import {Vacancy} from "@features/vacancies/types/Vacancies.types";
import {MouseEvent} from "react";
import {Feedback} from "@entities/feedback";

export interface VacancyRowProps {
    vacancy: Vacancy;
    feedback?: Feedback;
    onMouseEnter: (e: MouseEvent<HTMLElement>, feedbackText: string | null) => void;
    onMouseLeave: () => void;
    onDelete: (id: number) => void;
}