import {Vacancy} from "@features/vacancies/types/Vacancies.types";
import {Feedback} from "@features/feedback/types/Feedback.types";
import {MouseEvent} from "react";

export interface VacancyRowProps {
    vacancy: Vacancy;
    feedback?: Feedback;
    onMouseEnter: (e: MouseEvent<HTMLElement>, feedbackText: string | null) => void;
    onMouseLeave: () => void;
    onDelete: (id: number) => void;
}