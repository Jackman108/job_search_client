import { FC } from 'react';
import { Button } from '@ui';
import useSyncResumeFromHh from '../../hooks/useSyncResumeFromHh';
import styles from './ResumeSyncFromHh.module.css';

type Props = {
    onSynced?: () => void | Promise<unknown>;
};

const ResumeSyncFromHh: FC<Props> = ({ onSynced }) => {
    const { email, setEmail, password, setPassword, busy, error, status, sync } = useSyncResumeFromHh(onSynced);

    return (
        <section className={styles.block} aria-label="Синхронизация резюме с HeadHunter">
            <p className={styles.hint}>
                Забрать первое резюме с HH и заполнить поля в приложении (совпадающие секции).
            </p>
            <div className={styles.row}>
                <input
                    className={styles.input}
                    type="email"
                    autoComplete="username"
                    placeholder="Email HH"
                    value={email}
                    disabled={busy}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Пароль HH"
                    value={password}
                    disabled={busy}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={sync} variant="primary" disabled={busy}>
                    {busy ? 'Синхронизация…' : 'С HH'}
                </Button>
            </div>
            {error ? <p className={styles.error}>{error}</p> : null}
            {status && !error ? <p className={styles.status}>{status}</p> : null}
        </section>
    );
};

export default ResumeSyncFromHh;
