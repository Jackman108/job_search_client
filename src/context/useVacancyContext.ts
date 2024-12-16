// src/hooks/useVacancyContext.ts
import {createContext, useContext} from 'react';
import {VacancyContextType} from '../Interfaces/InterfaceVacancy.types';

const TableContext = createContext<VacancyContextType | undefined>(undefined);

export const useVacancyContext = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useVacancies must be used within a VacanciesProvider');
    }
    return context;
};
export default TableContext;