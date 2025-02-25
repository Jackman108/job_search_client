import {ChangeEvent, useCallback} from 'react';
import {businessTripReadiness} from '@features/resume/config/resumeLinesConfig';
import {useFormState} from "./useFormState";
import {ACTION_TYPES} from "@config/actionTypes";

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
                return {
                    ...prev,
                    [key]: checked
                        ? [...currentValues, value]
                        : currentValues.filter((item: string) => item !== value),
                };
            } else if (type === 'radio') {
                if (key === 'business_trip_readiness') {
                    return {...prev, [key]: value};
                }
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
                business_trip_readiness: type === ACTION_TYPES.RESUME
                    ? item.business_trip_readiness ? businessTripReadiness[0] : businessTripReadiness[1]
                    : item.business_trip_readiness,
            });
        },
        handleCancelClick: (type: string) => handleCancelClick(type),
        prepareDataForSubmit
    };
};
