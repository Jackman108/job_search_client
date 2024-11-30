// src/utils/errorHandler.ts
export const handleError = (error: unknown, defaultMessage: string = 'There was an error'): string => {
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  return defaultMessage;
};

export const handleAuthError = (setError: React.Dispatch<React.SetStateAction<string | null>>, error: any) => {
  const errorMessage = error?.response?.data?.message || 'Произошла ошибка';
  setError(errorMessage);
};

export const getErrorValidate = (emailError?: string, passwordError?: string) => {
  if (emailError) return emailError;
  if (passwordError) return passwordError;
  return 'Некорректные данные';
};
