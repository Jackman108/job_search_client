// src/components/VacancyForm/RenderTextarea.tsx
import { FC } from 'react';
import styles from './RenderTextarea.module.css';
import { RenderTextareaProps } from '../../Interfaces/InterfaceProfile.types';

const RenderTextarea: FC<RenderTextareaProps> = ({ label, name, value, onChange, isLoading }) => (
  <div className={styles.formGroup}>
    <textarea
      className={styles.textarea}
      name={name}
      value={value}
      onChange={onChange}
      disabled={isLoading}
      placeholder=''
    />
    <label htmlFor={name} className={styles.label}>{label}:</label>
  </div>
);

export default RenderTextarea;
