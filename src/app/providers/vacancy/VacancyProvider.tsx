import { useMemo } from 'react';
import { CaptchaAlert, HhCaptchaModal, HhJobDoneModal } from '@ui';
import { useAlert, useRefreshWhileHhJob, useWebSocketConnection } from '@hooks';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';
import useFetchVacancies from '@features/vacancies/hooks/useFetchVacancies';
import TableContext from './useVacancyContext';
import { AppProvidersProps } from '@app/types/AppProviders.props';
import type { HhJobKind } from '@type';

const APPLY_JOB_KINDS: readonly HhJobKind[] = ['sendFeedback'];

const VacancyProvider = ({ children }: AppProvidersProps) => {
    const { vacancies, loading, error, deleteVacancy, loadData } = useFetchVacancies();
    const { alertState, setAlert, handleCloseAlert } = useAlert();
    const {
        awaitingCaptcha,
        captchaSrc,
        captchaBusy,
        captchaError,
        submitCaptchaAnswer,
        completion,
        dismissCompletion,
        foundNotice,
        dismissFoundNotice,
        isJobActive,
    } = useHhJobContext();

    useWebSocketConnection(loadData, setAlert);
    useRefreshWhileHhJob(loadData, APPLY_JOB_KINDS);

    const contextValue = useMemo(
        () => ({ vacancies, loading, error, deleteVacancy, loadData }),
        [vacancies, loading, error, deleteVacancy, loadData],
    );

    return (
        <TableContext.Provider value={contextValue}>
            {children}
            {awaitingCaptcha ? (
                <HhCaptchaModal
                    captchaSrc={captchaSrc}
                    busy={captchaBusy}
                    error={captchaError}
                    onSubmit={submitCaptchaAnswer}
                />
            ) : null}
            {!awaitingCaptcha && completion ? (
                <HhJobDoneModal
                    found={completion.found}
                    success={completion.success}
                    skipped={completion.skipped}
                    pages={completion.pages}
                    onClose={dismissCompletion}
                />
            ) : null}
            {!awaitingCaptcha && !completion && foundNotice && isJobActive ? (
                <CaptchaAlert message={foundNotice} onClose={dismissFoundNotice} />
            ) : null}
            {alertState.message && !awaitingCaptcha && !completion && !foundNotice ? (
                <CaptchaAlert
                    message={alertState.message}
                    captchaSrc={alertState.captchaSrc}
                    onClose={handleCloseAlert}
                />
            ) : null}
        </TableContext.Provider>
    );
};

export default VacancyProvider;
