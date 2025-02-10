// src/hooks/useVacancyHandlers.ts
import {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import {Errors} from '../Interfaces/InterfaceForm.types';
import {DEFAULT_VACANCY_PARAMS, FormParams} from '../config/formConfigs';
import {useAuth} from '../context/useAuthContext';
import {buildVacancyUrl} from '../utils/buildVacancyUrl';
import useSubmitVacancy from './fetch/useSubmitVacancy';
import {VacancySubmitParams, VacancyHandlersParams} from "../Interfaces/InterfaceVacancy.types";

const useVacancyHandlers = (): VacancyHandlersParams => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        position: '',
        message: '',
        vacancyUrl: buildVacancyUrl(DEFAULT_VACANCY_PARAMS),
    });
    const [errors, setErrors] = useState<Errors>({});
    const {token, isLoading, setIsLoading} = useAuth();
    const {handleSubmit, handleStop} = useSubmitVacancy();

    const handleInputChange = (field: keyof typeof formValues) => (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormValues(prev => ({...prev, [field]: e.target.value}));
    };

    const handleSelectChange = (param: FormParams) => (
        e: ChangeEvent<HTMLSelectElement>) => {
        const newUrl = new URL(formValues.vacancyUrl);
        const urlParams = new URLSearchParams(newUrl.search);
        urlParams.set(param, e.target.value);
        setFormValues(prev => ({...prev, vacancyUrl: buildVacancyUrl(Object.fromEntries(urlParams.entries()))}));
    };

    const submitHandler = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const params: VacancySubmitParams = {
            token,
            ...formValues,
            setErrors,
            setIsLoading,
        };
        try {
            await handleSubmit(params);
        } finally {
            setIsLoading(false);
        }
    }, [token, formValues, setIsLoading, handleSubmit]);

    const stopHandler = useCallback(async () => {
        await handleStop();
        setIsLoading(false);
    }, [setIsLoading, handleStop]);

    return {
        ...formValues,
        errors,
        submitHandler,
        stopHandler,
        isLoading,
        handleVacancyUrlChange: handleInputChange('vacancyUrl'),
        handleEmailChange: handleInputChange('email'),
        handlePasswordChange: handleInputChange('password'),
        handlePositionChange: handleInputChange('position'),
        handleMessageChange: handleInputChange('message'),
        handleSelectChange,
    };
};

export default useVacancyHandlers;
