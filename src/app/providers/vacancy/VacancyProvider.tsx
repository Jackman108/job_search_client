import {useMemo} from 'react';
import {CaptchaAlert} from '@ui';
import {useAlert, useWebSocketConnection} from '@hooks';
import useFetchVacancies from '@features/vacancies/hooks/useFetchVacancies';
import TableContext from './useVacancyContext';
import {AppProvidersProps} from "@app/types/AppProviders.props";

const VacancyProvider = ({children}: AppProvidersProps) => {
    const {vacancies, loading, error, deleteVacancy, loadData} = useFetchVacancies();
    const {alertState, setAlert, handleCloseAlert} = useAlert();

    useWebSocketConnection(loadData, setAlert);

    const contextValue = useMemo(
        () => ({vacancies, loading, error, deleteVacancy, loadData}),
        [vacancies, loading, error, deleteVacancy, loadData]
    );

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
