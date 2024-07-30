import { useState } from 'react';
import { Errors, VacancyHandlersData } from '../Interfaces/Interface.types';
import { handleSubmit as submitHandler, handleStop as stopHandler } from './useVacancyHandlers';

const VacancyHandlers = (): VacancyHandlersData => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [vacancyUrl, setVacancyUrl] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await submitHandler(email, password, position, message, vacancyUrl, setErrors);
  };

  const handleStop = async () => {
    await stopHandler();
  };

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
    handleSubmit,
    handleStop,
  };
};

export default VacancyHandlers;
