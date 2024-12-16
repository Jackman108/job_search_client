// src/hooks/useSortedVacancies.ts
import {useCallback, useMemo, useState} from 'react';
import {SortConfig, SortDirection} from '../Interfaces/InterfaceVacancy.types';

export const useSortedData = <T extends Record<string, any>>(data: T[]) => {
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
        key: Object.keys(data[0] || {})[0] as keyof T,
        direction: 'ascending',
    });

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue === undefined || bValue === undefined) {
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

    return {sortedData, handleSort, getSortArrow};
};
