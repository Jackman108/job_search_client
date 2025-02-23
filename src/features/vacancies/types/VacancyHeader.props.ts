import {Vacancy} from "@features/vacancies/types/Vacancies.types";

export interface VacancyHeaderProps {
    handleSort: (key: keyof Vacancy) => void;
    getSortArrow: (key: keyof Vacancy) => string;
}