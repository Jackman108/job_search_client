import { useCallback, useState } from 'react';
import { useDataApi } from '@api';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';
import { formatHhJobError, isHhQueueResponse, validateEmail } from '@utils';
import { readSearchFormDraft } from '@shared/utils/searchFormDraft.utils';

const useSyncResumeFromHh = (onDone?: () => void | Promise<unknown>) => {
    const { request } = useDataApi();
    const { watchJob, isAbortError } = useHhJobContext();
    const draft = readSearchFormDraft();
    const [email, setEmail] = useState(draft?.email || '');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const sync = useCallback(async () => {
        const { isValidEmail, emailError } = validateEmail(email);
        if (!isValidEmail) {
            setError(emailError.email || 'Некорректный email');
            return;
        }
        if (!password.trim()) {
            setError('Введите пароль HH');
            return;
        }
        setBusy(true);
        setError(null);
        setStatus('Очередь…');
        try {
            const result = await request('post', '/sync-resume', { email, password });
            if (isHhQueueResponse(result) && result.jobId) {
                setStatus('Синхронизация с HH…');
                await watchJob(result.jobId, 'syncResume');
                setStatus('Готово');
                setPassword('');
                await onDone?.();
            } else {
                setError('Не удалось поставить задачу синхронизации');
            }
        } catch (err) {
            if (isAbortError(err)) return;
            const raw = err instanceof Error ? err.message : String(err);
            setError(formatHhJobError(raw));
            setStatus(null);
        } finally {
            setBusy(false);
        }
    }, [email, password, request, watchJob, isAbortError, onDone]);

    return { email, setEmail, password, setPassword, busy, error, status, sync };
};

export default useSyncResumeFromHh;
