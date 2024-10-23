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

export interface SortConfig {
  key: keyof Vacancy;
  direction: 'ascending' | 'descending';
}

export interface TableContextType {
  vacancies: Vacancy[];
  loading: boolean;
  error: string | null;
  fetchVacancies: () => Promise<void>;
  deleteVacancy: (id: number) => Promise<void>;
}

export interface VacanciesProviderProps {
  children: React.ReactNode;
}
