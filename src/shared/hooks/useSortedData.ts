import {useCallback, useMemo, useState} from 'react';
import {SortConfig, SortDirection} from '@features/vacancies/types/Vacancies.types';
import {LOCALES} from "@config/localesConfig";

export const useSortedData = <T extends Record<string, any>>(data: T[]) => {
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
        key: (data[0] ? Object.keys(data[0])[0] : 'id') as keyof T,
        direction: 'ascending',
    });

    const sortedData: T[] = useMemo(() => {
        try {
            return [...data].sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue === undefined || bValue === undefined) {
                    console.warn(`Значение для ключа ${String(sortConfig.key)} отсутствует у одного из элементов`);
                    return 0;
                }
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        } catch (error) {
            console.error(LOCALES.SORT_ERROR, error);
            return data;
        }
    }, [data, sortConfig]);

    const handleSort = useCallback((key: keyof T) => {
        setSortConfig((prevConfig) => {
            let direction: SortDirection = 'ascending';
            if (prevConfig.key === key && prevConfig.direction === 'ascending') {
                direction = 'descending';
            }
            return {key, direction};
        });
    }, []);

    const getSortArrow = useCallback((key: keyof T) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↑' : '↓';
        }
        return '↕';
    }, [sortConfig]);

    return {sortedData, handleSort, getSortArrow, error: sortedData === data ? LOCALES.SORT_ERROR : null};
};
