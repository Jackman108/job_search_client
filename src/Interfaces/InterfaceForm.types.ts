import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { OPTIONS } from '../config/formConfigs';

export interface Errors {
  [key: string]: string | undefined;

}

export interface HandleSubmitParams {
  token: string | null;
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
  isLoading: boolean | null;
  handleVacancyUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePositionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectChange: (param: keyof typeof OPTIONS) => (e: ChangeEvent<HTMLSelectElement>) => void;
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

export interface FormattedDate {
  time: string;
  date: string;
}

export interface SubmitRequestProps {
  token: string | null;
  endpoint: string;
  data?: Record<string, any>;
}

export interface RenderInputProps {
  id?: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  error?: string;
  isLoading: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  autoComplete?: string;
}

export interface RenderSelectProps {
  label: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
}

export interface RenderTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
}

export interface ProfileProps {
  onClose: () => void;
  isOpen: boolean;
}

export interface Option {
  value: string;
  label: string;
}

export interface RenderRowProps {
  label: string;
  value: string | number;
}
