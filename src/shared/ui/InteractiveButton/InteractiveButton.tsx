import { HTMLAttributes, ReactElement } from 'react';
import styles from './InteractiveButton.module.css';
import { InteractiveButtonProps } from '@type';
import { useComponentToggle } from '@hooks';

const badgeLabel = (badge: InteractiveButtonProps['jobBadge']): string => {
    if (badge === 'captcha') return 'C';
    if (badge === 'refresh') return 'R';
    if (badge === 'apply') return 'A';
    return '';
};

const InteractiveButton = ({
    icon,
    tooltipText,
    Component,
    position = 'left',
    isJobBusy = false,
    jobBadge = null,
}: InteractiveButtonProps): ReactElement => {
    const { isComponentOpen, toggleComponent, handleKeyPress } = useComponentToggle();
    const drawerId = `drawer-${tooltipText.replace(/\s+/g, '-').toLowerCase()}`;
    const drawerInertProps = (!isComponentOpen ? { inert: true } : {}) as HTMLAttributes<HTMLDivElement>;
    const badge = badgeLabel(jobBadge);

    return (
        <>
            <button
                className={styles.openButton}
                onClick={toggleComponent}
                onKeyDown={handleKeyPress}
                aria-label={tooltipText}
                aria-expanded={isComponentOpen}
                aria-controls={drawerId}
                aria-busy={isJobBusy || undefined}
            >
                {isJobBusy ? (
                    <span className={styles.spinner} aria-hidden />
                ) : (
                    <img src={icon} alt={tooltipText || 'Icon'} className={styles.icon} />
                )}
                {badge ? (
                    <span
                        className={`${styles.badge} ${jobBadge === 'captcha' ? styles.badgeCaptcha : ''} ${
                            jobBadge === 'refresh' ? styles.badgeRefresh : ''
                        } ${jobBadge === 'apply' ? styles.badgeApply : ''}`}
                        aria-hidden
                    >
                        {badge}
                    </span>
                ) : null}
                <span className={`${styles.tooltip} ${position === 'left' ? styles.tooltipLeft : styles.tooltipRight}`}>
                    {tooltipText}
                    {jobBadge ? ` · ${jobBadge}` : ''}
                </span>
            </button>
            <div
                className={`${styles.backdrop} ${position === 'left' ? styles.backdropLeft : styles.backdropRight} ${
                    isComponentOpen ? styles.open : ''
                }`}
                onClick={toggleComponent}
                hidden={!isComponentOpen}
            />
            <div
                id={drawerId}
                className={`${styles.drawer} ${position === 'left' ? styles.drawerLeft : styles.drawerRight} ${
                    isComponentOpen ? styles.open : ''
                }`}
                role="dialog"
                aria-label={tooltipText}
                aria-hidden={!isComponentOpen}
                {...drawerInertProps}
            >
                <Component onClose={toggleComponent} isOpen={isComponentOpen} />
            </div>
        </>
    );
};

export default InteractiveButton;
