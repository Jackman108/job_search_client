// src/hooks/useVacancies.ts

import { useContext } from 'react';
import { VacanciesContext } from '../hooks/VacanciesProvider';

export const useVacancies = () => {
    const context = useContext(VacanciesContext);
    if (!context) {
        throw new Error('useVacancies must be used within a VacanciesProvider');
    }
    return context;
};
