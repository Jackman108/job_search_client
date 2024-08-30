// src/hooks/useSortedVacancies.ts
import { useState, useMemo, useCallback } from 'react';
import { SortConfig, Vacancy } from '../Interfaces/InterfaceVacancy.types';

export const useSortedVacancies = (vacancies: Vacancy[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'response_date',
    direction: 'descending',
  });

  const sortedVacancies = useMemo(() => {
    return [...vacancies].sort((a, b) => {
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
  }, [vacancies, sortConfig]);

  const handleSort = useCallback((key: keyof Vacancy) => {
    setSortConfig((prevConfig) => {
      let direction: 'ascending' | 'descending' = 'ascending';
      if (prevConfig.key === key && prevConfig.direction === 'ascending') {
        direction = 'descending';
      }
      return { key, direction };
    });
  }, []);

  const getSortArrow = useCallback((key: keyof Vacancy) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '↕';
  }, [sortConfig]);

  return { sortedVacancies, handleSort, getSortArrow };
};
