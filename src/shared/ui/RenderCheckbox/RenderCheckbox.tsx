import React from 'react';
import styles from './RenderCheckbox.module.css';

interface RenderCheckboxProps {
    label: string;
    name: string;
    options: string[];
    selectedValues: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string) => void;
    error?: string;
}

const RenderCheckbox: React.FC<RenderCheckboxProps> = ({
                                                           label,
                                                           name,
                                                           options,
                                                           selectedValues,
                                                           onChange,
                                                           error,
                                                       }) => {
    return (
        <div className={styles.checkboxGroup}>
            <label className={styles.label}>{label}:</label>
            {options.map((option) => (
                <div key={option} className={styles.checkboxItem}>
                    <input
                        type="checkbox"
                        name={name}
                        value={option}
                        checked={selectedValues.includes(option)}
                        onChange={(e) => onChange(e, name)}
                        className={error ? styles.error : ''}
                    />
                    <label>{option}</label>
                </div>
            ))}
            {error && <p className={styles.errorText}>{error}</p>}
        </div>
    );
};

export default RenderCheckbox;