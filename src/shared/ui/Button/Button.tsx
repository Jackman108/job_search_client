import { FC } from 'react';
import { ButtonProps } from '@shared/types/Component.types';
import styles from './Button.module.css';

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  className = '',
  children,
  ...props
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button className={buttonClass} disabled={isLoading} {...props}>
      {isLoading ? 'Загрузка...' : children}
    </button>
  );
};

export default Button;
