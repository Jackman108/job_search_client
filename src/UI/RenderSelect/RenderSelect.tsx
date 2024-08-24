// src/components/VacancyForm/RenderSelect.tsx
import { FC } from 'react';
import styles from '../../components/VacancyForm/VacancyForm.module.css';

interface Option {
  value: string;
  label: string;
}

interface RenderSelectProps {
  label: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
}

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
