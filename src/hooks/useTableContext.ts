// src/hooks/useVacancies.ts

import { useContext } from 'react';
import { VacanciesContext } from './VacanciesProvider';

export const useTableContext = () => {
    const context = useContext(VacanciesContext);
    if (!context) {
        throw new Error('useVacancies must be used within a VacanciesProvider');
    }
    return context;
};
