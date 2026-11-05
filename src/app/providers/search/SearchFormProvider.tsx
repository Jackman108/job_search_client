import SearchFormContext from './useSearchFormContext';
import {useLocalStorage} from "@hooks";
import {AppProvidersProps} from "@app/types/AppProviders.props";

const SearchFormProvider = ({children}: AppProvidersProps) => {
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

export default SearchFormProvider