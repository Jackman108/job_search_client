// src/hooks/useTableContext.ts

import { createContext, useContext } from 'react';
import { VacanciesContextType } from '../Interfaces/Interface.types';
export const VacanciesContext = createContext<VacanciesContextType | undefined>(undefined);

export const useTableContext = () => {
    const context = useContext(VacanciesContext);
    if (!context) {
        throw new Error('useVacancies must be used within a VacanciesProvider');
    }
    return context;
};
