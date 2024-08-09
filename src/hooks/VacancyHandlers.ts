import { useCallback, useState } from 'react';
import { Errors, HandleSubmitParams, VacancyHandlersData } from '../Interfaces/Interface.types';
import { handleSubmit as submitHandler, handleStop as stopHandler } from './useVacancyHandlers';

const VacancyHandlers = (): VacancyHandlersData => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [vacancyUrl, setVacancyUrl] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (event: React.FormEvent): Promise<void> => {
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
    await submitHandler(params);
  }, [email, password, position, message, vacancyUrl]);

  const handleStop = useCallback(async () => {
    await stopHandler();
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
    handleSubmit,
    handleStop,
    isLoading,
  };
};

export default VacancyHandlers;
