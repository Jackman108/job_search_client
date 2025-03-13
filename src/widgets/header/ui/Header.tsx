import React, {FC} from 'react';
import {LanguageSwitcher} from "@ui";
import {Link} from "react-router-dom";
import styles from './Header.module.css';
import NavigationMenu from "@shared/ui/NavigationMenu/NavigationMenu";
import {useTranslation} from "react-i18next";

const Header: FC = () => {
    const {t} = useTranslation('header');

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo} aria-label="Home">
                {t('header.title')} 🏠
            </Link>
            <NavigationMenu/>
            <div className={styles.controls}>
                <LanguageSwitcher/>
            </div>
        </header>
    );
};

export default Header;