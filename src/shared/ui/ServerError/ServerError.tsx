import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServerError.module.css';
import { useTranslation } from 'react-i18next';
import useRedirectHomeIfApiHealthy from '@shared/hooks/useRedirectHomeIfApiHealthy';

/**
 * Страница ошибки: сервер недоступен.
 * Если GET /health уже ок — сразу на главную (ложный заход на /server-error).
 */
const ServerError: FC = () => {
    const { t } = useTranslation('errors');
    const { checking } = useRedirectHomeIfApiHealthy();
    const handleReload = () => window.location.reload();

    if (checking) {
        return (
            <div className={styles.container}>
                <p>{t('serverError.message')}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>{t('serverError.title')}</h1>
            <p>{t('serverError.message')}</p>
            <button className={styles.button} type="button" onClick={handleReload}>
                {t('serverError.button')}
            </button>
            <Link to="/" className={styles.homeLink}>
                {t('serverError.home')}
            </Link>
        </div>
    );
};

export default ServerError;
