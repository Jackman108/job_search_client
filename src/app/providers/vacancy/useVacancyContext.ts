import {createContext, useContext} from 'react';
import {VacancyContextType} from "@app/providers/vacancy/VacancyProvider.props";

const TableContext = createContext<VacancyContextType | undefined>(undefined);

export const useVacancyContext = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useVacancies must be used within a VacanciesProvider');
    }
    return context;
};
export default TableContext;