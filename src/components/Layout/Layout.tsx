// src/components/Layout/Layout.tsx
import { FC, ReactNode, useState } from 'react';
import styles from './Layout.module.css';
import InteractiveButton from '../../UI/InteractiveButton/InteractiveButton';
import { buttonConfigs } from '../../config/buttonConfigs';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {

    const renderButtons = (position: 'left' | 'right') => (
        buttonConfigs
            .filter(config => config.position === position)
            .map((config, index) => (
                <InteractiveButton
                    key={index}
                    icon={config.icon}
                    tooltipText={config.tooltipText}
                    Component={config.Component}
                    position={config.position}
                />
            ))
    );

    return (
        <div className={styles.layout}>
            <nav className={styles.sidebarLeft}>
                {renderButtons('left')}
            </nav>
            <div className={styles.content}>
                {children}
            </div>
            <nav className={styles.sidebarRight}>
                {renderButtons('right')}
            </nav>
        </div>
    );
};

export default Layout;
