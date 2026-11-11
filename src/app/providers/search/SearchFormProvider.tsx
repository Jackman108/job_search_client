import { useState } from 'react';
import SearchFormContext from './useSearchFormContext';
import { useLocalStorage } from '@hooks';
import { AppProvidersProps } from '@app/types/AppProviders.props';
import { useHhJobContext } from '@app/providers/hhJob/useHhJobContext';

const SearchFormProvider = ({ children }: AppProvidersProps) => {
    const { isJobActive } = useHhJobContext();
    const [selectedAuthId, setSelectedAuthId] = useLocalStorage<number | null>('selectedAuthId', null);
    const [selectedFieldId, setSelectedFieldId] = useLocalStorage<number | null>('selectedFieldId', null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isLoading = isSubmitting || isJobActive;

    return (
        <SearchFormContext.Provider
            value={{
                selectedAuthId,
                selectedFieldId,
                isLoading,
                setSelectedAuthId,
                setSelectedFieldId,
                setIsLoading: setIsSubmitting,
            }}
        >
            {children}
        </SearchFormContext.Provider>
    );
};

export default SearchFormProvider;
