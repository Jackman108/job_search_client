import {ReactElement} from 'react';
import styles from './InteractiveButton.module.css';
import {InteractiveButtonProps} from '@shared/types/Component.types';
import {useComponentToggle} from "@hooks/useComponentToggle";

const InteractiveButton = ({
                               icon,
                               tooltipText,
                               Component,
                               position = 'left',
                           }: InteractiveButtonProps): ReactElement => {
    const {isComponentOpen, toggleComponent, handleKeyPress} = useComponentToggle();

    return (
        <>
            <button
                className={styles.openButton}
                onClick={toggleComponent}
                onKeyDown={handleKeyPress}
                aria-label={tooltipText}
                aria-expanded={isComponentOpen}
                aria-controls="drawer"
            >
                <img src={icon} alt={tooltipText || 'Icon'} className={styles.icon}/>
                <span className={`${styles.tooltip} ${position === 'left' ? styles.tooltipLeft : styles.tooltipRight}`}>
          {tooltipText}
        </span>
            </button>
            {isComponentOpen && (
                <>
                    <div
                        id="drawer"
                        className={`${styles.backdrop} ${position === 'left' ? styles.backdropLeft : styles.backdropRight}
          ${isComponentOpen ? styles.open : ''}`}
                        onClick={toggleComponent}>
                    </div>
                    <div className={`${styles.drawer} ${position === 'left' ? styles.drawerLeft : styles.drawerRight} 
          ${isComponentOpen ? styles.open : ''}`}
                         role="dialog"
                         aria-labelledby="drawer"
                    >
                        <Component
                            onClose={toggleComponent}
                            isOpen={isComponentOpen}

                        />
                    </div>
                </>
            )}
        </>
    );
};

export default InteractiveButton;
