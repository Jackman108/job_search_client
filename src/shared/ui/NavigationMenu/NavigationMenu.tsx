import React from 'react';
import {Link} from 'react-router-dom';
import styles from './NavigationMenu.module.css';
import {useTranslation} from "react-i18next";

const NavigationMenu: React.FC = () => {
    const {t} = useTranslation('header');

    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>{t('nav.vacancies')}</Link>
            <Link to="/feedback" className={styles.navLink}>{t('nav.feedback')}</Link>
            <Link to="/resume" className={styles.navLink}>{t('nav.resume')}</Link>
        </nav>
    );
};

export default NavigationMenu;