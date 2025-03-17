import {businessTripReadiness} from "@entities/resume/constants";

export const formatValue = (key: string, value: any): string => {
    switch (key) {
        case 'business_trip_readiness':
            return formatBusinessTripReadiness(value);
        case 'employment_type':
        case 'work_schedule':
            return formatListValue(value);
        default:
            return formatDefaultValue(value);
    }
};

const formatBusinessTripReadiness = (value: boolean): string =>
    value ? businessTripReadiness[1] : businessTripReadiness[0];

const formatListValue = (value: string): string =>
    value ? value.replace(/["{}]/g, '').replace(/,/g, ' / ') : 'Не указано';

const formatDefaultValue = (value: any): string => value || 'Не указано';
