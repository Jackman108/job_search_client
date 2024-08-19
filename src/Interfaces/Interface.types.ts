import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { OPTIONS } from '../config/formConfigs';

export interface Errors {
  [key: string]: string | undefined;

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
  setErrors: Dispatch<SetStateAction<Errors>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface UseFormHandlersParams {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  position: string;
  setPosition: Dispatch<SetStateAction<string>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  vacancyUrl: string;
  setVacancyUrl: Dispatch<SetStateAction<string>>;
  errors: Errors;
  submitHandler: (event: FormEvent) => Promise<void>;
  stopHandler: () => Promise<void>;
  isLoading: boolean;
  handleVacancyUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePositionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectChange: (param: keyof typeof OPTIONS) => (e: ChangeEvent<HTMLSelectElement>) => void;
}



export interface WebSocketHook {
  connect: () => void;
  message: string | null;
  error: string | null;
  open: boolean;
}

export interface UseWebSocketParams {
  API_URL: string;
  WS_URL: string;
  fetchVacanciesByUserId: (userId: string, token: string) => void;
  fetchVacanciesByProfileId: (profileId: string, token: string) => void;
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

export interface ButtonConfig<T> {
  icon: string;
  tooltipText: string;
  Component: FC<T>;
  position: 'left' | 'right';
}

export interface VacancyFormProps {
  onClose: () => void;
  isOpen: boolean;
}

export type RenderSelectProps = {
  label: string;
  options: {
    value: string;
    label: string;
  };
  param: keyof typeof OPTIONS;
};

export type RenderInputProps = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export interface ProfileProps {
  onClose: () => void;
  isOpen: boolean;
}

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

export interface InteractiveButtonProps {
  icon: string;
  tooltipText: string;
  Component: FC<{ onClose: () => void; isOpen: boolean }>;
  position?: 'left' | 'right';
}