import {Dispatch, SetStateAction} from "react";

export interface SearchFormState {
    selectedAuthId: number | null;
    selectedFieldId: number | null;
    isLoading: boolean;
    setSelectedAuthId: (id: number | null) => void;
    setSelectedFieldId: (id: number | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}