  export interface Errors {
    email?: string;
    vacancyUrl?: string;
  }
  
  export interface VacancyHandlersData {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    position: string;
    setPosition: (value: string) => void;
    message: string;
    setMessage: (value: string) => void;
    vacancyUrl: string;
    setVacancyUrl: (value: string) => void;
    errors: Errors;
    handleSubmit: (event: React.FormEvent) => void;
    handleStop: () => void;
    isLoading: boolean;
  }

  export interface Vacancy {
    id: number;
    title_vacancy: string;
    url_vacancy: string;
    title_company: string;
    url_company: string;
    vacancy_status: boolean;
    response_date: string;
    response_date_time?: string; 
  response_date_date?: string; 
  }
  
  export interface VacanciesContextType {
    vacancies: Vacancy[];
    loading: boolean;
    error: string | null;
  }
  
  export interface VacanciesProviderProps {
    children: React.ReactNode;
  }

  export interface SortConfig {
    key: keyof Vacancy;
    direction: 'ascending' | 'descending';
  };