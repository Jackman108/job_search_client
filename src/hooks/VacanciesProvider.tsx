import { createContext, FC, useCallback, useEffect, useState } from 'react';
import { StateAlertProps, VacanciesContextType, VacanciesProviderProps } from '../Interfaces/Interface.types';
import useFetchVacancies from '../hooks/useFetchVacancies';
import { useWebSocket } from '../hooks/useWebSocket';
import CaptchaAlert from '../components/CaptchaAlert/CaptchaAlert';

export const VacanciesContext = createContext<VacanciesContextType | undefined>(undefined);

const VacanciesProvider: FC<VacanciesProviderProps> = ({
  children
}): JSX.Element => {
  const apiUrl = 'http://localhost:8000';
  const wsUrl = 'ws://localhost:8000';
  const { vacancies, loading, error, fetchVacancies } = useFetchVacancies(apiUrl);

  const [alertState, setAlertState] = useState<StateAlertProps>({
    message: null,
    captchaSrc: undefined,
  });

  const setAlert = useCallback((message: string) => {
    const [alert, src] = 
      message.split(' ').length > 2 
        ? [message.split(' ')[0] + ' ' + message.split(' ')[1], message.split(' ')[2]] 
        : [message, undefined];
    setAlertState({ message: alert, captchaSrc: src });
  }, []);

  const { error: wsError } = useWebSocket({
    wsUrl,
    fetchVacancies,
    setAlert
  });

  useEffect(() => {
    if (wsError) {
      console.error('WebSocket error:', wsError);
    }
  }, [wsError]);

  const handleCloseAlert = () => {
    setAlertState({ message: null, captchaSrc: undefined });
  };

  return (
    <VacanciesContext.Provider value={{ vacancies, loading, error }}>
      {children}
      {alertState.message && <CaptchaAlert message={alertState.message} captchaSrc={alertState.captchaSrc} onClose={handleCloseAlert} />}
    </VacanciesContext.Provider>
  );
};


export default VacanciesProvider;
