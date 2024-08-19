import { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { StateAlertProps, VacanciesContextType } from '../Interfaces/Interface.types';
import useFetchVacancies from '../hooks/useFetchVacancies';
import { useWebSocket } from '../hooks/useWebSocket';
import CaptchaAlert from '../UI/CaptchaAlert/CaptchaAlert';
import { WS_URL, API_URL } from '../config/serverConfig';

export const VacanciesContext = createContext<VacanciesContextType | undefined>(undefined);

const VacanciesProvider: FC<{ children: ReactNode }> = ({
  children
}): JSX.Element => {
  const { vacancies, loading, error, fetchVacanciesByUserId, fetchVacanciesByProfileId } = useFetchVacancies(API_URL);

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
    WS_URL,
    API_URL,
    fetchVacanciesByUserId,
    fetchVacanciesByProfileId, 
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
  const contextValue = useMemo(() => ({ vacancies, loading, error }), [vacancies, loading, error]);

  return (
    <VacanciesContext.Provider value={contextValue}>
      {children}
      {alertState.message &&
        <CaptchaAlert message={alertState.message}
          captchaSrc={alertState.captchaSrc}
          onClose={handleCloseAlert}
        />
      }
    </VacanciesContext.Provider>
  );
};


export default VacanciesProvider;
