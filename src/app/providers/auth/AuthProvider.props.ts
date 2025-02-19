import {Dispatch, SetStateAction} from "react";

export interface AuthContextProps {
    token: string | null;
    isLoading: boolean;
    setToken: (token: string | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}