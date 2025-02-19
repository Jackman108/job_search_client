// src/components/Resume/ResumeView.tsx
import {FC} from 'react';
import {ResumeViewProps} from '../../types/InterfaceResume.types';
import Button from '@ui/Button/Button';
import RenderRow from '@ui/RenderRow/RenderRow';
import {formatValue} from '@utils/formatValue';
import styles from '../Resume.module.css';
import ResumeArray from '../ResumeArray/ResumeArray';

const ResumeView: FC<ResumeViewProps> = ({type, fields, data, config, onEditClick, onDeleteClick, onCreateClick}) => (
    <div className={styles.dataContainer}>
        {type === 'skills' || type === 'workExperience' ? (
            <>
                <ResumeArray config={config} type={type}/>
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
                        <img src="/pen.png" alt="Edit" className={styles.editIcon}/>
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
