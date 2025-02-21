import {ReactNode, useEffect, useState} from "react";
import SearchFormContext from './useSearchFormContext';

export const SearchFormProvider = ({children}: { children: ReactNode }) => {
    const [selectedAuthId, setSelectedAuthId] = useState<number | null>(null);
    const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(() => {
        const savedIsLoading = localStorage.getItem('isLoading');
        return savedIsLoading ? JSON.parse(savedIsLoading) : false;
    });

    useEffect(() => {
        localStorage.setItem('isLoading', JSON.stringify(isLoading));
    }, [isLoading]);

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