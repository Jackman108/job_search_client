import {FC} from 'react';
import {Button, RenderRow} from '@ui';
import {formatValue} from '@utils';
import styles from '../ResumeSection/ResumeSection.module.css';
import ResumeArray from '../ResumeArray/ResumeArray';
import {ACTION_TYPES} from "@config";
import {ResumeViewProps} from "@features/resume/props/Resume.props";

const ResumeView: FC<ResumeViewProps> = (
    {type, fields, data, config, onEditClick, onDeleteClick, onCreateClick}
) => (
    <div className={styles.dataContainer}>
        {type === ACTION_TYPES.SKILLS || type === ACTION_TYPES.EXPERIENCE ? (
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
