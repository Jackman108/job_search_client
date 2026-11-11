import { FC } from 'react';
import styles from './RenderTextarea.module.css';
import { RenderTextareaProps } from '@type';

const RenderTextarea: FC<RenderTextareaProps> = ({ label, name, value, onChange, isLoading, disabled = false }) => (
    <div className={styles.formGroup}>
        <textarea
            className={styles.textarea}
            name={name}
            value={value}
            onChange={onChange}
            disabled={isLoading || disabled}
            placeholder=""
        />
        <label htmlFor={name} className={styles.label}>
            {label}:
        </label>
    </div>
);

export default RenderTextarea;
