import {ReactNode} from "react";
import SearchFormContext from './useSearchFormContext';
import useLocalStorage from "@hooks/useLocalStorage";

export const SearchFormProvider = ({children}: { children: ReactNode }) => {
    const [selectedAuthId, setSelectedAuthId] = useLocalStorage<number | null>('selectedAuthId', null);
    const [selectedFieldId, setSelectedFieldId] = useLocalStorage<number | null>('selectedFieldId', null);
    const [isLoading, setIsLoading] = useLocalStorage<boolean>('isLoading', false);

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