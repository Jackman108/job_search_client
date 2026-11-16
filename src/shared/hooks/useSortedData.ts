import { useCallback, useMemo, useState } from 'react';
import { SortConfig, SortDirection } from '@type';
import { LOCALES } from '@config';

export type SortedDataComparator<T> = (a: T, b: T, direction: SortDirection) => number;

export type UseSortedDataOptions<T> = {
    initialKey?: keyof T;
    initialDirection?: SortDirection;
    comparators?: Partial<Record<keyof T & string, SortedDataComparator<T>>>;
};

const useSortedData = <T extends Record<string, any>>(data: T[], options?: UseSortedDataOptions<T>) => {
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
        key: (options?.initialKey ?? (data[0] ? (Object.keys(data[0])[0] as keyof T) : ('id' as keyof T))) as keyof T,
        direction: options?.initialDirection ?? 'ascending',
    });

    const sortedData: T[] = useMemo(() => {
        try {
            const key = String(sortConfig.key);
            const custom = options?.comparators?.[key as keyof T & string];
            return [...data].sort((a, b) => {
                if (custom) {
                    return custom(a, b, sortConfig.direction);
                }
                const aValue = a[sortConfig.key] as string | number | null | undefined;
                const bValue = b[sortConfig.key] as string | number | null | undefined;
                if (aValue === undefined || aValue === null || bValue === undefined || bValue === null) {
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
    }, [data, sortConfig, options?.comparators]);

    const handleSort = useCallback((key: keyof T) => {
        setSortConfig((prevConfig) => {
            let direction: SortDirection = 'ascending';
            if (prevConfig.key === key && prevConfig.direction === 'ascending') {
                direction = 'descending';
            }
            return { key, direction };
        });
    }, []);

    const getSortArrow = useCallback(
        (key: keyof T) => {
            if (sortConfig.key === key) {
                return sortConfig.direction === 'ascending' ? '↑' : '↓';
            }
            return '↕';
        },
        [sortConfig],
    );

    return { sortedData, handleSort, getSortArrow, error: sortedData === data ? LOCALES.SORT_ERROR : null };
};

export default useSortedData;
