import { Vacancy } from "@entities/vacancy";

export interface VacancyContextType {
    vacancies: Vacancy[];
    loading: boolean;
    error: Error | null;
    deleteVacancy: (id: number) => Promise<void>;
    loadData: () => Promise<any>;
}