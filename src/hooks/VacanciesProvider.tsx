import { FC, ReactNode, useMemo } from 'react';
import { VacanciesContext } from '../context/useTableContext';
import useFetchVacancies from './useFetchVacancies';
import useAlert from './useAlert';
import useWebSocketConnection from './useWebSocketConnection';
import CaptchaAlert from '../UI/CaptchaAlert/CaptchaAlert';

const VacanciesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { vacancies, loading, error, fetchVacanciesByUserId } = useFetchVacancies();
  const { alertState, setAlert, handleCloseAlert } = useAlert();

  useWebSocketConnection(fetchVacanciesByUserId, setAlert);

  const contextValue = useMemo(() => ({ vacancies, loading, error }), [vacancies, loading, error]);

  return (
    <VacanciesContext.Provider value={contextValue}>
      {children}
      {alertState.message && (
        <CaptchaAlert
          message={alertState.message}
          captchaSrc={alertState.captchaSrc}
          onClose={handleCloseAlert}
        />
      )}
    </VacanciesContext.Provider>
  );
};

export default VacanciesProvider;
