// src/hooks/useVacancyHandlers.ts

import axios from 'axios';
import { Errors } from '../Interfaces/Interface.types';
import { validateUtils } from '../utils/validateUtils';

const apiUrl = process.env.REACT_APP_API_URL || '';

export const handleSubmit = async (
  email: string,
  password: string,
  position: string,
  message: string,
  vacancyUrl: string,
  setErrors: (errors: Errors) => void,
  setIsLoading: (isLoading: boolean) => void
): Promise<void> => {
  const { isValid, errors: validationErrors } = validateUtils(email, vacancyUrl);

  if (!isValid) {
    setErrors(validationErrors);
    return;
  }

  setIsLoading(true);

  try {
    const response = await axios.post(`${apiUrl}/start`, {
      email,
      password,
      position,
      message,
      vacancyUrl,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
  } finally {
    setIsLoading(false);
  }
};

export const handleStop = async (): Promise<void> => {
  try {
    const response = await axios.post(`${apiUrl}/stop`);
    console.log(response.data);
  } catch (error) {
    console.error('Ошибка при остановке скрипта:', error);
  }
};
