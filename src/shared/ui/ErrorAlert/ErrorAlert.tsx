import {FC} from 'react';
import styles from './ErrorAlert.module.css';

interface ErrorAlertProps {
    message: string;
}

const ErrorAlert: FC<ErrorAlertProps> = ({message}) => {
    return (
        <div className={styles.errorAlert}>
            <p>{message}</p>
        </div>
    );
};

export default ErrorAlert;