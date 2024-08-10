import { useState, FC } from 'react';
import styles from './InteractiveButton.module.css';

interface InteractiveButtonProps {
  iconSrc: string;
  tooltipText: string;
  Component: FC<{ onClose: () => void; isOpen: boolean }>;
}

const InteractiveButton = ({
  iconSrc,
  tooltipText,
  Component
}: InteractiveButtonProps): JSX.Element => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const toggleComponent = () => {
    setIsComponentOpen(!isComponentOpen);
  };

  return (
    <>
      <button className={styles.openButton} onClick={toggleComponent}>
        <img src={iconSrc} alt="Open" className={styles.icon} />
        <span className={styles.tooltip}>{tooltipText}</span>
      </button>
      <Component onClose={toggleComponent} isOpen={isComponentOpen} />
    </>
  );
};

export default InteractiveButton;
