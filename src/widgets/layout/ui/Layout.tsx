import { FC, ReactNode } from 'react';
import styles from './Layout.module.css';
import { InteractiveButton } from '@ui';
import { useVisibleLayoutButtons } from '../hooks/useVisibleLayoutButtons';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    const buttons = useVisibleLayoutButtons();

    const renderButtons = (position: 'left' | 'right') =>
        buttons
            .filter((config) => config.position === position)
            .map((config, index) => (
                <InteractiveButton
                    key={`${config.tooltipText}-${index}`}
                    icon={config.icon}
                    tooltipText={config.tooltipText}
                    Component={config.Component}
                    position={config.position}
                    aria-label={config.tooltipText}
                />
            ));

    return (
        <div className={styles.layout}>
            <nav className={styles.sidebarLeft} role="navigation" aria-label="Left Sidebar">
                {renderButtons('left')}
            </nav>
            <div className={styles.content}>{children}</div>
            <nav className={styles.sidebarRight} role="navigation" aria-label="Right Sidebar">
                {renderButtons('right')}
            </nav>
        </div>
    );
};

export default Layout;
