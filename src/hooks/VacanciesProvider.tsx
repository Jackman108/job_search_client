import { createContext, FC, useEffect } from 'react';
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

    const { error: wsError } = useWebSocket(wsUrl, fetchVacancies);

    useEffect(() => {
      if (wsError) {
        console.error('WebSocket error:', wsError);
      }
    }, [wsError]);    
    return (
        <VacanciesContext.Provider value={{ vacancies, loading, error }}>
            {children}
            
        </VacanciesContext.Provider>
    );
};


export default VacanciesProvider;
