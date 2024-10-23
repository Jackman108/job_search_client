// src/utils/errorHandler.ts
export const handleError = (error: unknown, defaultMessage: string = 'There was an error'): string => {
    if (error instanceof Error) {
      return error.message || defaultMessage;
    }
    return defaultMessage;
  };
  