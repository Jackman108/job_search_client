// src/utils/validateUtils.ts
import { Errors, ValidationParams, ValidationResult } from "../Interfaces/InterfaceForm.types";


export const validateUtils = ({ email, vacancyUrl }: ValidationParams): ValidationResult => {
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
