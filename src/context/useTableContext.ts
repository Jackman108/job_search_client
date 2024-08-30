// src/hooks/useTableContext.ts
import { createContext, useContext } from 'react';
import { TableContextType } from '../Interfaces/InterfaceVacancy.types';

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useVacancies must be used within a VacanciesProvider');
    }
    return context;
};
export default TableContext;