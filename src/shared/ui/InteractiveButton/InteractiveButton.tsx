import { HTMLAttributes, ReactElement } from 'react';
import styles from './InteractiveButton.module.css';
import { InteractiveButtonProps } from '@type';
import { useComponentToggle } from '@hooks';

const InteractiveButton = ({
    icon,
    tooltipText,
    Component,
    position = 'left',
    isJobBusy = false,
}: InteractiveButtonProps): ReactElement => {
    const { isComponentOpen, toggleComponent, handleKeyPress } = useComponentToggle();
    const drawerId = `drawer-${tooltipText.replace(/\s+/g, '-').toLowerCase()}`;
    const drawerInertProps = (!isComponentOpen ? { inert: true } : {}) as HTMLAttributes<HTMLDivElement>;

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
                <span className={`${styles.tooltip} ${position === 'left' ? styles.tooltipLeft : styles.tooltipRight}`}>
                    {tooltipText}
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
