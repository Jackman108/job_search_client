// src/components/Resume/ResumeView.tsx
import { FC } from 'react';
import Button from '../../UI/Button/Button';
import RenderRow from '../../UI/RenderRow/RenderRow';
import { formatValue } from '../../utils/formatValue';
import RenderFormArray from '../RenderFormArray/RenderFormArray';
import styles from './DataDisplay.module.css';

interface ResumeViewProps {
  type: string;
  fields: Record<string, string>;
  data: Record<string, any>;
  config: Record<string, any>;
  onEditClick: (type: string, data: any) => void;
  onDeleteClick: (type: string) => void;
  onCreateClick: (type: string) => void;
}

const ResumeView: FC<ResumeViewProps> = ({ type, fields, data, config, onEditClick, onDeleteClick, onCreateClick }) => (
  <div className={styles.dataContainer}>
    {type === 'skills' || type === 'workExperience' ? (
        <>
            <RenderFormArray config={config[type]} />
            <Button onClick={() => onCreateClick(type)} variant="primary">
                Добавить +
            </Button>
        </>
      ) : (
        <>
            {Object.entries(fields).map(([key, label]) => (
                <div key={key} className={styles.dataField}>
                    <RenderRow
                    label={label}
                    value={formatValue(key, data[key])}
                    />
                </div>
            ))}
            <div className={styles.buttonGroup}>
                <Button onClick={() => onEditClick(type, data)} className={styles.editButton} variant="secondary">
                    <img src="/pen.png" alt="Edit" className={styles.editIcon} />
                </Button>
                <Button onClick={() => onDeleteClick(type)} className={styles.editButton} variant="secondary">
                    Удалить
                </Button>
            </div>
        </>
    )}
  </div>
);

export default ResumeView;
