import {ReactNode, useState} from "react";
import SearchFormContext from './useSearchFormContext';

export const SearchFormProvider = ({children}: { children: ReactNode }) => {
    const [selectedAuthId, setSelectedAuthId] = useState<number | null>(null);
    const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <SearchFormContext.Provider
            value={{
                selectedAuthId,
                selectedFieldId,
                isLoading,
                setSelectedAuthId,
                setSelectedFieldId,
                setIsLoading,
            }}
        >
            {children}
        </SearchFormContext.Provider>
    );
};