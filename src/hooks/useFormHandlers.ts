// src/hooks/useFormHandlers.ts
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Errors, HandleSubmitParams, UseFormHandlersParams } from '../Interfaces/Interface.types';
import { handleSubmit, handleStop } from './useVacancyHandlers';

const useFormHandlers = (): UseFormHandlersParams => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [vacancyUrl, setVacancyUrl] = useState('https://hh.ru/search/vacancy?L_save_area=true&text=&excluded_text=&salary=&currency_code=USD&experience=doesNotMatter&order_by=relevance&search_period=7&items_on_page=50&hhtmFrom=vacancy_search_filter');
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const useInputChangeHandler = (setter: (value: string) => void) =>
  useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  }, [setter]);

const useTextAreaChangeHandler = (setter: (value: string) => void) =>
  useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setter(e.target.value);
  }, [setter]);

  const submitHandler = useCallback(async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const params: HandleSubmitParams = {
      email,
      password,
      position,
      message,
      vacancyUrl,
      setErrors,
      setIsLoading,
    };
    await handleSubmit(params);
  }, [email, password, position, message, vacancyUrl]);

  const stopHandler = useCallback(async () => {
    await handleStop();
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    position,
    setPosition,
    message,
    setMessage,
    vacancyUrl,
    setVacancyUrl,
    errors,
    submitHandler,
    stopHandler,
    isLoading,
    handleVacancyUrlChange: useInputChangeHandler(setVacancyUrl),
    handleEmailChange: useInputChangeHandler(setEmail),
    handlePasswordChange: useInputChangeHandler(setPassword),
    handlePositionChange: useInputChangeHandler(setPosition),
    handleMessageChange: useTextAreaChangeHandler(setMessage),
  };
};

export default useFormHandlers;
