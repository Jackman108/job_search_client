import { createContext, FC, useEffect, useRef, useState } from 'react';
import { VacanciesContextType, VacanciesProviderProps } from '../Interfaces/Interface.types';
import useFetchVacancies from '../hooks/useFetchVacancies';
import { useWebSocket } from '../hooks/useWebSocket';
import CaptchaAlert from '../components/CaptchaAlert/CaptchaAlert';

export const VacanciesContext = createContext<VacanciesContextType | undefined>(undefined);

const VacanciesProvider: FC<VacanciesProviderProps> = ({
    children
}): JSX.Element => {
    const apiUrl =  'http://localhost:8000';
    const wsUrl =  'ws://localhost:8000';
    const { vacancies, loading, error, fetchVacancies } = useFetchVacancies(apiUrl);

    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [captchaSrc, setCaptchaSrc] = useState<string | undefined>(undefined);

    const { error: wsError } = useWebSocket(wsUrl, fetchVacancies, (message) => {
      const [alert, src] = message.split(' ').length > 2 ? [message.split(' ')[0] + ' ' + message.split(' ')[1], message.split(' ')[2]] : [message, undefined];
      setAlertMessage(alert);
      setCaptchaSrc(src);
  });

    useEffect(() => {
      if (wsError) {
        console.error('WebSocket error:', wsError);
      }
    }, [wsError]);   

    const handleCloseAlert = () => {
      setAlertMessage(null);
      setCaptchaSrc(undefined);
  };

    return (
        <VacanciesContext.Provider value={{ vacancies, loading, error }}>
            {children}
            {alertMessage && <CaptchaAlert message={alertMessage} captchaSrc={captchaSrc} onClose={handleCloseAlert}/>}            
        </VacanciesContext.Provider>
    );
};


export default VacanciesProvider;
