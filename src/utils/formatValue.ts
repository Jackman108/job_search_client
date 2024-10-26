import { businessTripReadiness } from "../config/resumeLinesConfig";

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

// Форматирование значения для "business_trip_readiness"
const formatBusinessTripReadiness = (value: boolean): string =>
  value ? businessTripReadiness[1] : businessTripReadiness[0];

// Форматирование значения для списка (например, employment_type и work_schedule)
const formatListValue = (value: string): string =>
  value ? value.replace(/["{}]/g, '').replace(/,/g, ' / ') : 'Не указано';

// Форматирование по умолчанию
const formatDefaultValue = (value: any): string => value || 'Не указано';
