// src/hooks/useVacancyFormState.ts
import {ChangeEvent, useCallback, useState} from 'react';
import {buildVacancyUrl} from "../../utils/buildVacancyUrl";
import {Errors} from "../../Interfaces/InterfaceForm.types";
import {DEFAULT_VACANCY_PARAMS} from "../../config/searchConfig";


const useVacancyFormState = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        position: '',
        message: '',
        vacancyUrl: buildVacancyUrl(DEFAULT_VACANCY_PARAMS),
    });

    const [errors, setErrors] = useState<Errors>({});

    const handleInputChange = useCallback((field: keyof typeof formValues) => (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormValues(prev => ({...prev, [field]: e.target.value}));
    }, []);

    const handleSelectChange = useCallback((param: string) => (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        const newUrl = new URL(formValues.vacancyUrl);
        const urlParams = new URLSearchParams(newUrl.search);
        urlParams.set(param, e.target.value);
        setFormValues(prev => ({...prev, vacancyUrl: buildVacancyUrl(Object.fromEntries(urlParams.entries()))}));
    }, [formValues.vacancyUrl]);

    return {
        formValues,
        errors,
        setErrors,
        handleInputChange,
        handleSelectChange,
    };
};

export default useVacancyFormState;