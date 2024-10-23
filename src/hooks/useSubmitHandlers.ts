// src/hooks/useVacancyHandlers.ts
import { HandleSubmitParams } from '../Interfaces/InterfaceForm.types';
import useApi from '../api/api';
import { validateUtils } from '../utils/validateUtils';

const useSubmitHandlers = () => {
  const { request } = useApi();

  const handleSubmit = async ({
    token,
    email,
    password,
    position,
    message,
    vacancyUrl,
    setErrors,
    setIsLoading,
  }: HandleSubmitParams): Promise<void> => {
    const { isValid, errors: validationErrors } = validateUtils({ email, vacancyUrl });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);

    await request('post', '/start', { email, password, position, message, vacancyUrl });
    setIsLoading(false);
  };

  const handleStop = async (): Promise<void> => {
    try {
      await request('post', '/stop');
    } catch (error) {
      console.error('Stop error:', error);
    }
  };

  return { handleSubmit, handleStop };
};

export default useSubmitHandlers;