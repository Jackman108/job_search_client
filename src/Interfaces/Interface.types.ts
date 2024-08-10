import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

export interface Errors {
  email?: string;
  vacancyUrl?: string;
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

export interface HandleSubmitParams {
  email: string;
  password: string;
  position: string;
  message: string;
  vacancyUrl: string;
  setErrors: (errors: Errors) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export interface UseFormHandlersParams {
  email: string;
  setEmail: Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<React.SetStateAction<string>>
  position: string;
  setPosition: Dispatch<React.SetStateAction<string>>
  message: string;
  setMessage: Dispatch<React.SetStateAction<string>>
  vacancyUrl: string;
  setVacancyUrl: Dispatch<React.SetStateAction<string>>
  errors: Errors;
  submitHandler: (event: FormEvent) => Promise<void>;
  stopHandler: () => Promise<void>;
  isLoading: boolean;
  handleVacancyUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePositionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface WebSocketHook {
  connect: () => void;
  fetchVacancies: () => void;
  message: string | null;
  error: string | null;
  open: boolean;
}

export interface UseWebSocketParams {
  wsUrl: string;
  fetchVacancies: () => void;
  setAlert: (message: string) => void;
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

export interface CaptchaAlertProps {
  message: string;
  captchaSrc?: string;
  onClose: () => void;
}

export interface SubmitRequestProps {
  endpoint: string;
  data?: Record<string, any>;
}

export interface StateAlertProps {
message: string | null; 
captchaSrc: string | undefined;
}

export interface FormattedDate {
  time: string;
  date: string;
}

export interface ValidationParams {
  email: string;
  vacancyUrl: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Errors;
}

export interface FormHandlers {
  handleVacancyUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePositionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}