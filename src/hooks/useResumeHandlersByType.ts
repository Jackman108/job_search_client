// hooks/useResumeHandlersByType.ts
import {ChangeEvent, useCallback, useState} from 'react';
import {businessTripReadiness} from '../config/resumeLinesConfig';

export const useResumeHandlersByType = (initialFormData = {}) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
    const [isCreating, setIsCreating] = useState<Record<string, boolean>>({});
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>, key: string) => {

        const value = e.target.value;
        setFormData(prev => {
            if (e.target.type === 'radio') {
                if (key === 'business_trip_readiness') {
                    return {...prev, [key]: value};
                }
                return {...prev, [key]: value};
            } else if (e.target.type === 'checkbox') {
                const currentValues = Array.isArray(prev[key]) ? prev[key] : [];
                if (e.target.checked) {
                    return {...prev, [key]: [...currentValues, value]};
                } else {
                    return {...prev, [key]: currentValues.filter((item: string) => item !== value)};
                }
            } else {
                return {...prev, [key]: value};
            }
        });
    }, []);


    const resetFormData = useCallback(() => setFormData({}), []);

    const handleCreateClick = (type: string) => {
        setIsCreating(prev => ({...prev, [type]: true}));
        resetFormData();
    };

    const handleEditClick = useCallback((type: string, item: any) => {
        setIsEditing(prev => ({...prev, [type]: true}));

        setFormData({
            ...item,
            business_trip_readiness: type === 'resume' ? (item.business_trip_readiness ? businessTripReadiness[0] : businessTripReadiness[1]) : item.business_trip_readiness,
        });
    }, []);

    const handleCancelClick = (type: string) => {
        setIsEditing(prev => ({...prev, [type]: false}));
        setIsCreating(prev => ({...prev, [type]: false}));
        resetFormData();
    };


    return {formData, isCreating, isEditing, handleInputChange, handleCreateClick, handleEditClick, handleCancelClick};
};
