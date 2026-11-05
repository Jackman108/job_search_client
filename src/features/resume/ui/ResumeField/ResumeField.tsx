import React from 'react';
import styles from '@features/resume/ui/ResumeChange/ResumeChange.module.css';
import {RenderInput} from "@ui";
import RenderCheckbox from "@shared/ui/RenderCheckbox/RenderCheckbox";
import RenderRadio from "@shared/ui/RenderRadio/RenderRadio";
import {ResumeFieldProps} from "@features/resume/props/Resume.props";

const ResumeField: React.FC<ResumeFieldProps> = (
    {
        fieldKey, label, value, onChange, formData, fieldType, options, error
    }
) => {
    const renderField = () => {
        switch (fieldType) {
            case 'text':
                return (
                    <RenderInput
                        label={label}
                        name={fieldKey}
                        value={value || ''}
                        onChange={(e) => onChange(e, fieldKey)}
                        type="text"
                        isLoading={false}
                        error={error}
                    />
                );
            case 'checkbox':
                return (
                    <RenderCheckbox
                        label={label}
                        name={fieldKey}
                        options={options || []}
                        selectedValues={formData[fieldKey] || []}
                        onChange={(e) => onChange(e, fieldKey)}
                        error={error}
                    />
                );
            case 'radio':
                return (
                    <RenderRadio
                        label={label}
                        name={fieldKey}
                        options={options || []}
                        selectedValue={formData[fieldKey]}
                        onChange={(e) => onChange(e, fieldKey)}
                        error={error}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.formField}>{renderField()}</div>
    );
};

export default ResumeField;
