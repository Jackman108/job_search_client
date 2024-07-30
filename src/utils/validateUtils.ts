// src/utils/validateUtils.ts

import { Errors } from '../Interfaces/Interface.types';

export const validateUtils = (email: string, vacancyUrl: string): { isValid: boolean, errors: Errors } => {
  let valid = true;
  const newErrors: Errors = {};

  if (email && !/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Введите корректный email';
    valid = false;
  }

  if (vacancyUrl && !vacancyUrl.startsWith('https://hh.ru/')) {
    newErrors.vacancyUrl = 'URL должен начинаться с https://hh.ru/';
    valid = false;
  }

  return { isValid: valid, errors: newErrors };
};
