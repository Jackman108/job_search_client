// src/components/VacancyForm/RenderInput.tsx
import { FC } from 'react';
import styles from '../../components/VacancyForm/VacancyForm.module.css';
import { RenderInputProps } from '../../Interfaces/InterfaceProfile.types';

const RenderInput: FC<RenderInputProps> = ({ label, name, value, onChange, error, isLoading, type = 'text', placeholder }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}:</label>
    <input
      className={`${styles.input} ${error ? styles.error : ''}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={isLoading}
      placeholder={placeholder}
    />
    {error && <p className={styles.errorText}>{error}</p>}
  </div>
);

export default RenderInput;
