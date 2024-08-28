// src/components/UI/RenderInput.tsx
import { FC } from 'react';
import styles from './RenderInput.module.css';
import { RenderInputProps } from '../../Interfaces/InterfaceProfile.types';

const RenderInput: FC<RenderInputProps> = ({ 
  label, name, value, onChange, error, isLoading, type = 'text', placeholder, required 
}) => {
  const autoCompleteValue = type === 'password' ? 'current-password' : 'off';
  return (
    <div className={styles.formGroup}>
      <input
        id={name}
        className={`${styles.input} ${error ? styles.error : ''}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={isLoading}
        placeholder={placeholder}
        required={required}
        autoComplete={autoCompleteValue}
      />
      <label htmlFor={name} className={styles.label}>{label}:</label>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
export default RenderInput;
