import {ChangeEvent, useCallback} from 'react';
import {businessTripReadiness} from '@entities/resume/constants';
import {useFormState} from "@hooks";
import {ACTION_TYPES} from "@config";
import {parseArrayFromString} from "@utils";

export const useResumeHandlersByType = (initialFormData = {}) => {
    const {
        formData,
        isEditing,
        isCreating,
        setFormData,
        handleEditClick,
        handleCancelClick,
        handleCreateClick,
    } = useFormState(initialFormData);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>, key: string) => {
        const {type, value, checked} = e.target;

        setFormData(prev => {
            if (type === 'checkbox') {
                const currentValues = Array.isArray(prev[key]) ? prev[key] : [];
                if (checked) {
                    if (!currentValues.includes(value)) {
                        return {...prev, [key]: [...currentValues, value]};
                    }
                } else {
                    return {...prev, [key]: currentValues.filter((item: string) => item !== value)};
                }
                return prev;
            } else if (type === 'radio') {
                return {...prev, [key]: value};
            } else {
                return {...prev, [key]: value};
            }
        });
    }, [setFormData]);

    const prepareDataForSubmit = useCallback((type: string, formData: Record<string, any>) => {

        return {
            ...formData,
            business_trip_readiness: type === ACTION_TYPES.RESUME
                ? formData.business_trip_readiness === 'Готов'
                : formData.business_trip_readiness,
        };
    }, []);

    return {
        formData,
        isCreating,
        isEditing,
        handleInputChange,
        handleCreateClick: (type: string) => handleCreateClick(type),
        handleEditClick: (type: string, item: any) => {
            handleEditClick(type, {
                ...item,
                ...(type === ACTION_TYPES.RESUME && {
                    employment_type: item.employment_type ? parseArrayFromString(item.employment_type) : [],
                    work_schedule: item.work_schedule ? parseArrayFromString(item.work_schedule) : [],
                    business_trip_readiness: item.business_trip_readiness ? businessTripReadiness[1] : businessTripReadiness[0],
                })
            });
        },
        handleCancelClick: (type: string) => handleCancelClick(type),
        prepareDataForSubmit
    };
};
