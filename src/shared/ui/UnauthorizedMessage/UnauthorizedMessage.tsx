// components/UnauthorizedMessage.tsx
import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './UnauthorizedMessage.module.css';

const UnauthorizedMessage: React.FC = () => {
    const { t } = useTranslation('errors');
    return (
        <section>
            <Link to="/" className="home-button"> 🏠 </Link>
            <div className={styles.errorMessage}>{t('unauthorized')}</div>
        </section>
    );
};

export default UnauthorizedMessage;
