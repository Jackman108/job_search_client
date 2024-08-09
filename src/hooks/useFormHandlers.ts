// src/hooks/useFormHandlers.ts
import { ChangeEvent, useCallback } from 'react';
import { FormHandlers, UseFormHandlersParams } from '../Interfaces/Interface.types';

export const useFormHandlers = ({
    setEmail,
    setPassword,
    setPosition,
    setMessage,
    setVacancyUrl
  }: UseFormHandlersParams): FormHandlers => {
  const handleVacancyUrlChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setVacancyUrl(e.target.value);
  }, [setVacancyUrl]);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [setPassword]);

  const handlePositionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  }, [setPosition]);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, [setMessage]);

  return {
    handleVacancyUrlChange,
    handleEmailChange,
    handlePasswordChange,
    handlePositionChange,
    handleMessageChange
  };
};
