import {FC} from 'react';
import {RenderSelectProps} from '../../Interfaces/InterfaceForm.types';
import styles from './RenderSelect.module.css';

const RenderSelect: FC<RenderSelectProps> = ({label, options, value, onChange, isLoading, required}) => (
    <div className={styles.formGroup}>
        <label className={styles.label}>{label}:</label>
        <select
            className={styles.select}
            onChange={onChange}
            disabled={isLoading}
            value={value}
            name={label}
            required={required}

        >
            {options?.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

export default RenderSelect;
