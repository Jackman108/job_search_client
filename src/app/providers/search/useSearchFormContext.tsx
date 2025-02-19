import {createContext, useContext} from 'react';
import {SearchFormState} from "@app/providers/search/SearchFormProvider.props";

const SearchFormContext = createContext<SearchFormState | undefined>(undefined);

export const useSearchFormContext = () => {
    const context = useContext(SearchFormContext);
    if (!context) {
        throw new Error('useSearchFormContext must be used within a SearchFormProvider');
    }
    return context;
};

export default SearchFormContext;