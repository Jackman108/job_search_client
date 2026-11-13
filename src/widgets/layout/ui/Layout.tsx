import { FC, ReactNode } from 'react';
import styles from './Layout.module.css';
import { InteractiveButton } from '@ui';
import { useVisibleLayoutButtons } from '../hooks/useVisibleLayoutButtons';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    const buttons = useVisibleLayoutButtons();
    const { activeJob, isJobActive, awaitingCaptcha } = useHhJobContext();

    const renderButtons = (position: 'left' | 'right') =>
        buttons
            .filter((config) => config.position === position)
            .map((config, index) => {
                const kindBusy = Boolean(config.jobKind && isJobActive && activeJob?.kind === config.jobKind);
                const jobBadge =
                    kindBusy && awaitingCaptcha
                        ? ('captcha' as const)
                        : kindBusy && config.jobKind === 'sendFeedback'
                          ? ('apply' as const)
                          : kindBusy && config.jobKind === 'getFeedback'
                            ? ('refresh' as const)
                            : null;

                return (
                    <InteractiveButton
                        key={`${config.tooltipText}-${index}`}
                        icon={config.icon}
                        tooltipText={config.tooltipText}
                        Component={config.Component}
                        position={config.position}
                        jobKind={config.jobKind}
                        isJobBusy={kindBusy}
                        jobBadge={jobBadge}
                        aria-label={config.tooltipText}
                    />
                );
            });

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
