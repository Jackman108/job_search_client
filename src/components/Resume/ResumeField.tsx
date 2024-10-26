// src/components/Resume/ResumeField.tsx
import React from 'react';
import styles from './DataDisplay.module.css';

interface ResumeFieldProps {
  fieldKey: string; 
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  formData: Record<string, any>;
  fieldType: 'text' | 'checkbox' | 'radio';
  options?: string[];
}

const ResumeField: React.FC<ResumeFieldProps> = ({ fieldKey, label, value, onChange, formData, fieldType, options }) => {
  const renderField = () => {
    switch (fieldType) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e, fieldKey)}
          />
        );
      case 'checkbox':
        return options?.map(option => (
          <div key={option}>
            <input
              type="checkbox"
              checked={formData[fieldKey]?.includes(option)}
              onChange={(e) => onChange(e, fieldKey)}
              value={option}
            />
            {option}
          </div>
        ));
      case 'radio':
        return options?.map(option => (
          <div key={option}>
            <input
              type="radio"
              checked={formData[fieldKey] === option}
              onChange={(e) => onChange(e, fieldKey)}
              value={option}
            />
            {option}
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className={styles.formField}>
      <label>
        {label}
        {renderField()}
      </label>
    </div>
  );
};

export default ResumeField;