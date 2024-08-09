// src/hooks/useVacancyHandlers.ts

import axios from 'axios';
import { HandleSubmitParams } from '../Interfaces/Interface.types';
import { validateUtils } from '../utils/validateUtils';

const apiUrl = process.env.REACT_APP_API_URL || '';

const submitRequest = async (endpoint: string, data?: Record<string, any>) => {
  try {
    const response = await axios.post(`${apiUrl}/${endpoint}`, data);
    console.log(response.data);
  } catch (error) {
    console.error(`Ошибка при выполнении запроса к ${endpoint}:`, error);
  }
};

export const handleSubmit = async ({
  email,
  password,
  position,
  message,
  vacancyUrl,
  setErrors,
  setIsLoading,
}: HandleSubmitParams): Promise<void> => {
  const { isValid, errors: validationErrors } = validateUtils(email, vacancyUrl);

  if (!isValid) {
    setErrors(validationErrors);
    return;
  }

  setIsLoading(true);
  await submitRequest('start', { email, password, position, message, vacancyUrl });
  setIsLoading(false);
};

export const handleStop = async (): Promise<void> => {
  await submitRequest('stop');
};
