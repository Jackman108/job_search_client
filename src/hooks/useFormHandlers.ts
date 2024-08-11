// src/hooks/useFormHandlers.ts
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useState } from 'react';
import { Errors, HandleSubmitParams, UseFormHandlersParams } from '../Interfaces/Interface.types';
import { handleSubmit, handleStop } from './useVacancyHandlers';
import { buildVacancyUrl } from '../utils/buildVacancyUrl';
import { DEFAULT_VACANCY_PARAMS } from '../config/formConfigs';
import { FormParams } from '../config/formConfigs';

const useFormHandlers = (): UseFormHandlersParams => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [vacancyUrl, setVacancyUrl] = useState(buildVacancyUrl(DEFAULT_VACANCY_PARAMS));
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (setter: Dispatch<SetStateAction<string>>) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
  };

  const handleSelectChange = (param: FormParams) => (
    e: ChangeEvent<HTMLSelectElement>) => {
    const newUrl = new URL(vacancyUrl);
    const urlParams = new URLSearchParams(newUrl.search);
    urlParams.set(param, e.target.value);
    setVacancyUrl(buildVacancyUrl(Object.fromEntries(urlParams.entries())));
  };

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
    handleVacancyUrlChange: handleInputChange(setVacancyUrl),
    handleEmailChange: handleInputChange(setEmail),
    handlePasswordChange: handleInputChange(setPassword),
    handlePositionChange: handleInputChange(setPosition),
    handleMessageChange: handleInputChange(setMessage),
    handleSelectChange,
  };
};

export default useFormHandlers;
