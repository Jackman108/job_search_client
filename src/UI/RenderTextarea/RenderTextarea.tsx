// src/components/VacancyForm/RenderTextarea.tsx
import { FC } from 'react';
import styles from './RenderTextarea.module.css';
import { RenderTextareaProps } from '../../Interfaces/InterfaceProfile.types';

const RenderTextarea: FC<RenderTextareaProps> = ({ label, value, onChange, isLoading }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}:</label>
    <textarea
      className={styles.textarea}
      value={value}
      onChange={onChange}
      disabled={isLoading}
    />
  </div>
);

export default RenderTextarea;
