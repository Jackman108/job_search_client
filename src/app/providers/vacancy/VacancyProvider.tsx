import {FC, ReactNode, useMemo} from 'react';
import CaptchaAlert from '@ui/CaptchaAlert/CaptchaAlert';
import useAlert from '@hooks/useAlert';
import useFetchVacancies from '@features/vacancies/hooks/useFetchVacancies';
import useWebSocketConnection from '@hooks/useWebSocketConnection';
import TableContext from './useVacancyContext';

const VacancyProvider: FC<{ children: ReactNode }> = ({children}) => {
    const {vacancies, loading, error, fetchVacancies, deleteVacancy, loadData} = useFetchVacancies();
    const {alertState, setAlert, handleCloseAlert} = useAlert();

    useWebSocketConnection(loadData, setAlert);

    const contextValue = useMemo(
        () => ({vacancies, loading, error, fetchVacancies, deleteVacancy, loadData}),
        [vacancies, loading, error, fetchVacancies, deleteVacancy, loadData]);

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

export default VacancyProvider;
