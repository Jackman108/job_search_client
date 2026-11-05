import React from 'react';
import styles from './RenderRadio.module.css';

interface RenderRadioProps {
    label: string;
    name: string;
    options: string[];
    selectedValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string) => void;
    error?: string;
}

const RenderRadio: React.FC<RenderRadioProps> = ({
                                                     label,
                                                     name,
                                                     options,
                                                     selectedValue,
                                                     onChange,
                                                     error,
                                                 }) => {
    return (
        <div className={styles.radioGroup}>
            <label className={styles.label}>{label}:</label>
            {options.map((option) => (
            <div key={option} className={styles.radioItem}>
                <input
                    type="radio"
                    name={name}
                    value={option}
                    checked={selectedValue === option}
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

export default RenderRadio;