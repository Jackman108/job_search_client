// src/hooks/useFormHandlers.ts
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useState } from 'react';
import { Errors, HandleSubmitParams, UseFormHandlersParams } from '../Interfaces/InterfaceForm.types';
import { DEFAULT_VACANCY_PARAMS, FormParams } from '../config/formConfigs';
import { useAuth } from '../context/useAuthContext';
import { buildVacancyUrl } from '../utils/buildVacancyUrl';
import useSubmitHandlers from './fetch/useSubmitHandlers';

const useFormHandlers = (): UseFormHandlersParams => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [vacancyUrl, setVacancyUrl] = useState(buildVacancyUrl(DEFAULT_VACANCY_PARAMS));
  const [errors, setErrors] = useState<Errors>({});
  const { token, isLoading, setIsLoading  } = useAuth();
  const { handleSubmit, handleStop } = useSubmitHandlers();

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

  const submitHandler = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const params: HandleSubmitParams = {
      token,
      email,
      password,
      position,
      message,
      vacancyUrl,
      setErrors,
      setIsLoading,
    };
    try {
      await handleSubmit(params);
    } finally {
      setIsLoading(false); 
    }
  }, [token, email, password, position, message, vacancyUrl, setIsLoading, handleSubmit]);

  const stopHandler = useCallback(async () => {
    await handleStop();
    setIsLoading(false);
  }, [setIsLoading, handleStop]);

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
