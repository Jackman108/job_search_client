// src/components/VacancyForm/RenderSelect.tsx
import { FC } from 'react';
import { RenderSelectProps } from '../../Interfaces/InterfaceForm.types';
import styles from './RenderSelect.module.css';

const RenderSelect: FC<RenderSelectProps> = ({ label, options, onChange, isLoading }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}:</label>
    <select
      className={styles.select}
      onChange={onChange}
      disabled={isLoading}
      name={label}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default RenderSelect;
