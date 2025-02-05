import {Dispatch, SetStateAction} from "react";

export const handleAuthError = (setError: Dispatch<SetStateAction<string | null>>, error: any) => {
    const errorMessage = error?.response?.data?.message || 'Произошла ошибка';
    setError(errorMessage);
};

export const getErrorValidate = (emailError?: string, passwordError?: string) => {
    if (emailError) return emailError;
    if (passwordError) return passwordError;
    return 'Некорректные данные';
};
