import { FC } from 'react';
import { Button } from '@ui';
import useSyncResumeFromHh from '../../hooks/useSyncResumeFromHh';
import styles from './ResumeSyncFromHh.module.css';

type Props = {
    onSynced?: () => void | Promise<unknown>;
};

const ResumeSyncFromHh: FC<Props> = ({ onSynced }) => {
    const { busy, error, status, sync, hasApplyCreds, authLoading, missingCredsHint } = useSyncResumeFromHh(onSynced);

    return (
        <section className={styles.block} aria-label="Синхронизация резюме с HeadHunter">
            {!authLoading && !hasApplyCreds ? (
                <p className={styles.notice} role="status">
                    {missingCredsHint}
                </p>
            ) : null}
            <p className={styles.hint}>Забрать первое резюме с HH (логин/пароль — те же, что в «Отправка заявок»).</p>
            <div className={styles.row}>
                <Button onClick={sync} variant="primary" disabled={busy || authLoading || !hasApplyCreds}>
                    {busy ? 'Синхронизация…' : 'Синхронизировать с HH'}
                </Button>
            </div>
            {error ? <p className={styles.error}>{error}</p> : null}
            {status && !error ? <p className={styles.status}>{status}</p> : null}
        </section>
    );
};

export default ResumeSyncFromHh;
