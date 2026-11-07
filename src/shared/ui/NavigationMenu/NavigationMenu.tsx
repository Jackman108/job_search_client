import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationMenu.module.css';

export interface NavigationMenuLink {
    path: string;
    label: string;
}

interface NavigationMenuProps {
    links: NavigationMenuLink[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ links }) => {
    if (links.length === 0) {
        return null;
    }

    return (
        <nav className={styles.nav} aria-label="Main">
            {links.map((link) => (
                <Link key={link.path} to={link.path} className={styles.navLink}>
                    {link.label}
                </Link>
            ))}
        </nav>
    );
};

export default NavigationMenu;
