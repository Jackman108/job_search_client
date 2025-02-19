import {Vacancy} from "@features/vacancies/types/Vacancies.types";

export interface VacancyContextType {
    vacancies: Vacancy[];
    loading: boolean;
    error: string | null;
    fetchVacancies: () => Promise<void>;
    deleteVacancy: (id: number) => Promise<void>;
}