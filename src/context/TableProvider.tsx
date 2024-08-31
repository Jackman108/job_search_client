import { FC, ReactNode, useMemo } from 'react';
import CaptchaAlert from '../UI/CaptchaAlert/CaptchaAlert';
import useAlert from '../hooks/useAlert';
import useFetchVacancies from '../hooks/useFetchVacancies';
import useWebSocketConnection from '../hooks/useWebSocketConnection';
import TableContext from './useTableContext';

const TableProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { vacancies, loading, error, fetchVacancies } = useFetchVacancies();
  const { alertState, setAlert, handleCloseAlert } = useAlert();

  useWebSocketConnection(fetchVacancies, setAlert);

  const contextValue = useMemo(() => ({ vacancies, loading, error }), [vacancies, loading, error]);

  return (
    <TableContext.Provider value={contextValue}>
      {children}
      {alertState.message && (
        <CaptchaAlert
          message={alertState.message}
          captchaSrc={alertState.captchaSrc}
          onClose={handleCloseAlert}
        />
      )}
    </TableContext.Provider>
  );
};

export default TableProvider;
