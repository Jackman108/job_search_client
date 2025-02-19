import {FC} from 'react';
import styles from './RenderSelect.module.css';
import {RenderSelectProps} from "@shared/types/Form.types";

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
