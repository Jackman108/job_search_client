// src/components/Resume/ResumeChange.tsx
import React from 'react';
import {ResumeChangeProps} from '../../types/InterfaceResume.types';
import Button from '@ui/Button/Button';
import {businessTripReadiness, employmentTypes, travelTimes, workSchedules} from '../../config/resumeLinesConfig';
import styles from '../Resume.module.css';
import ResumeField from './ResumeField';

const ResumeChange: React.FC<ResumeChangeProps> = ({
                                                       type,
                                                       fields,
                                                       formData,
                                                       onCancel,
                                                       handleSubmit,
                                                       handleInputChange
                                                   }) => (

    <form className={styles.createForm} onSubmit={(e) => handleSubmit(e, type)}>
        {Object.entries(fields).map(([key, label]) => (
            <ResumeField
                key={key}
                fieldKey={key}
                label={label}
                value={formData[key]}
                onChange={handleInputChange}
                formData={formData}
                fieldType={
                    key === 'employment_type' || key === 'work_schedule' ? 'checkbox' :
                        key === 'travel_time' || key === 'business_trip_readiness' ? 'radio' : 'text'
                }
                options={key === 'employment_type' ?
                    employmentTypes : key === 'work_schedule' ?
                        workSchedules : key === 'travel_time' ?
                            travelTimes : businessTripReadiness
                }
            />
        ))}
        <div className={styles.buttonGroup}>
            <Button type="submit" variant="primary">Сохранить</Button>
            <Button type="button" variant="secondary" onClick={onCancel}>Отменить</Button>
        </div>
    </form>
);

export default ResumeChange;
