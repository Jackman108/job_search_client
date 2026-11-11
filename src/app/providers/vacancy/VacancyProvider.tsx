import { useMemo } from 'react';
import { CaptchaAlert } from '@ui';
import { useAlert, useRefreshWhileHhJob, useWebSocketConnection } from '@hooks';
import useFetchVacancies from '@features/vacancies/hooks/useFetchVacancies';
import TableContext from './useVacancyContext';
import { AppProvidersProps } from '@app/types/AppProviders.props';
import type { HhJobKind } from '@type';

const APPLY_JOB_KINDS: readonly HhJobKind[] = ['sendFeedback'];

const VacancyProvider = ({ children }: AppProvidersProps) => {
    const { vacancies, loading, error, deleteVacancy, loadData } = useFetchVacancies();
    const { alertState, setAlert, handleCloseAlert } = useAlert();

    useWebSocketConnection(loadData, setAlert);
    // Detached HH worker cannot push WS; refresh table while apply job runs.
    useRefreshWhileHhJob(loadData, APPLY_JOB_KINDS);

    const contextValue = useMemo(
        () => ({ vacancies, loading, error, deleteVacancy, loadData }),
        [vacancies, loading, error, deleteVacancy, loadData],
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
