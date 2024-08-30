import { useState } from 'react';
import styles from './InteractiveButton.module.css';
import { InteractiveButtonProps } from '../../Interfaces/InterfaceComponent.types';

const InteractiveButton = ({
  icon,
  tooltipText,
  Component,
  position = 'left',
}: InteractiveButtonProps): JSX.Element => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const toggleComponent = () => {
    setIsComponentOpen(!isComponentOpen);
  };

  return (
    <>
      <button className={styles.openButton} onClick={toggleComponent}>
        <img src={icon} alt="Open" className={styles.icon} />
        <span className={`${styles.tooltip} ${position === 'left' ? styles.tooltipLeft : styles.tooltipRight}`}>
          {tooltipText}
        </span>
      </button>
      {isComponentOpen && (
        <>
          <div className={`${styles.backdrop} ${position === 'left' ? styles.backdropLeft : styles.backdropRight}
          ${isComponentOpen ? styles.open : ''}`} onClick={toggleComponent}></div>
          <div className={`${styles.drawer} ${position === 'left' ? styles.drawerLeft : styles.drawerRight} 
          ${isComponentOpen ? styles.open : ''}`}>
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
