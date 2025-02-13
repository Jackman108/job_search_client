import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';

interface SearchFormState {
    selectedAuthId: number | null;
    selectedFieldId: number | null;
    isLoading: boolean;
    setSelectedAuthId: (id: number | null) => void;
    setSelectedFieldId: (id: number | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const SearchFormContext = createContext<SearchFormState | undefined>(undefined);

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

export const useSearchFormContext = () => {
    const context = useContext(SearchFormContext);
    if (!context) {
        throw new Error('useSearchFormContext must be used within a SearchFormProvider');
    }
    return context;
};