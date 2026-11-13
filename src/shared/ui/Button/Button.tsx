import { FC } from 'react';
import { ButtonProps } from '@type';
import styles from './Button.module.css';

const Button: FC<ButtonProps> = ({
    variant = 'primary',
    isLoading = false,
    disabled = false,
    className = '',
    children,
    ...props
}) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

    return (
        <button className={buttonClass} {...props} disabled={disabled || isLoading}>
            {isLoading ? 'Загрузка...' : children}
        </button>
    );
};

export default Button;
