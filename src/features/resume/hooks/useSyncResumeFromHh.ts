import { useCallback, useMemo, useState } from 'react';
import { useDataApi } from '@api';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';
import { useSearchAuth } from '@hooks';
import { formatHhJobError, isHhQueueResponse } from '@utils';

const MISSING_CREDS_HINT =
    'Для синхронизации откройте «Отправка заявок», введите логин и пароль HeadHunter, нажмите «Сохранить» — после этого можно обновить резюме с HH.';

const useSyncResumeFromHh = (onDone?: () => void | Promise<unknown>) => {
    const { request } = useDataApi();
    const { watchJob, isAbortError } = useHhJobContext();
    const { auths, isLoading: authLoading } = useSearchAuth();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const hasApplyCreds = useMemo(() => (auths || []).some((a) => Boolean(a?.email?.trim() && a?.password)), [auths]);

    const sync = useCallback(async () => {
        if (!hasApplyCreds) {
            setError(MISSING_CREDS_HINT);
            setStatus(null);
            return;
        }
        setBusy(true);
        setError(null);
        setStatus('Очередь…');
        try {
            // Credentials come from vacancy_auth (same as apply) on the API.
            const result = await request('post', '/sync-resume', {});
            if (isHhQueueResponse(result) && result.jobId) {
                setStatus('Синхронизация с HH…');
                await watchJob(result.jobId, 'syncResume');
                setStatus('Готово');
                await onDone?.();
            } else {
                setError('Не удалось поставить задачу синхронизации');
            }
        } catch (err) {
            if (isAbortError(err)) return;
            const axiosData = (err as { response?: { data?: { code?: string; message?: string } } })?.response?.data;
            if (
                axiosData?.code === 'HH_CREDS_MISSING' ||
                /логин|парол|Сохранить|Отправка заявок/i.test(axiosData?.message || '')
            ) {
                setError(axiosData?.message || MISSING_CREDS_HINT);
            } else {
                const raw = err instanceof Error ? err.message : String(err);
                setError(formatHhJobError(raw));
            }
            setStatus(null);
        } finally {
            setBusy(false);
        }
    }, [hasApplyCreds, request, watchJob, isAbortError, onDone]);

    return {
        busy,
        error,
        status,
        sync,
        hasApplyCreds,
        authLoading,
        missingCredsHint: MISSING_CREDS_HINT,
    };
};

export default useSyncResumeFromHh;
