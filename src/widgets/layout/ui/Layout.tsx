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
                const trackedKinds = config.jobKinds?.length ? config.jobKinds : config.jobKind ? [config.jobKind] : [];
                const activeKind = activeJob?.kind;
                const kindBusy = Boolean(isJobActive && activeKind && trackedKinds.includes(activeKind));
                const jobBadge =
                    kindBusy && awaitingCaptcha
                        ? ('captcha' as const)
                        : kindBusy && activeKind === 'sendFeedback'
                          ? ('apply' as const)
                          : kindBusy && activeKind === 'syncResume'
                            ? ('sync' as const)
                            : kindBusy && activeKind === 'getFeedback'
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
            <a href="#main-content" className={styles.skipLink}>
                Перейти к содержимому
            </a>
            <nav className={styles.sidebarLeft} role="navigation" aria-label="Левая панель">
                {renderButtons('left')}
            </nav>
            <main id="main-content" className={styles.content} tabIndex={-1}>
                {children}
            </main>
            <nav className={styles.sidebarRight} role="navigation" aria-label="Правая панель">
                {renderButtons('right')}
            </nav>
        </div>
    );
};

export default Layout;
