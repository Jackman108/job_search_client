import {Vacancy} from "@entities/vacancy";

export interface VacancyContextType {
    vacancies: Vacancy[];
    loading: boolean;
    error: string | null;
    fetchVacancies: () => Promise<void>;
    deleteVacancy: (id: number) => Promise<void>;
}