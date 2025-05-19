import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServerError.module.css';
import { useTranslation } from 'react-i18next';

/**
 * Страница ошибки: сервер недоступен
 */
const ServerError: FC = () => {
    const { t } = useTranslation('errors');
    const handleReload = () => window.location.reload();
    return (
        <div className={styles.container}>
            <h1>{t('serverError.title')}</h1>
            <p>{t('serverError.message')}</p>
            <button className={styles.button} onClick={handleReload}>
                {t('serverError.button')}
            </button>
            <Link to="/" className={styles.homeLink}>
                {t('serverError.home')}
            </Link>
        </div>
    );
};

export default ServerError; 