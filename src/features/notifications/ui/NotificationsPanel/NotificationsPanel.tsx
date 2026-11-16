import { FC } from 'react';
import { Button } from '@ui';
import useNotifications from '@features/notifications/hooks/useNotifications';
import styles from './NotificationsPanel.module.css';

const NotificationsPanel: FC = () => {
    const { items, unread, loading, error, reload, markRead } = useNotifications();

    return (
        <section className={styles.panel}>
            <h2>Уведомления {unread > 0 ? `(${unread})` : ''}</h2>
            <Button variant="primary" onClick={() => void reload()}>
                Обновить
            </Button>
            {loading && <p className={styles.empty}>Загрузка…</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && items.length === 0 && (
                <p className={styles.empty}>Пока тихо — ежедневный прогресс появится после входа.</p>
            )}
            <ul className={styles.list}>
                {items.map((n) => (
                    <li key={n.id} className={`${styles.item} ${n.read_at ? '' : styles.itemUnread}`}>
                        <h3>{n.title}</h3>
                        <p>{n.body}</p>
                        <div className={styles.meta}>{new Date(n.created_at).toLocaleString()}</div>
                        {!n.read_at && (
                            <Button variant="primary" onClick={() => void markRead(n.id)}>
                                Прочитано
                            </Button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default NotificationsPanel;
