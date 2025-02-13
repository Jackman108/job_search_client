import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {buildVacancyUrl} from "../../utils/buildVacancyUrl";
import {Errors, FormValues, InitialFields} from "../../Interfaces/InterfaceForm.types";
import {DEFAULT_SEARCH} from "../../config/searchConfig";

const useSearchFormState = (
    initialEmail: string = '',
    initialPassword: string = '',
    initialFields: InitialFields | null = null
) => {
    const [formValues, setFormValues] = useState<FormValues>({
        email: initialEmail,
        password: initialPassword,
        position: initialFields?.position || '',
        message: initialFields?.message || '',
        vacancyUrl: initialFields?.vacancy_url || buildVacancyUrl(DEFAULT_SEARCH),
        schedule: initialFields?.schedule || DEFAULT_SEARCH.schedule,
        orderBy: initialFields?.order_by || DEFAULT_SEARCH.orderBy,
        searchField: initialFields?.search_field || DEFAULT_SEARCH.searchField,
        experience: initialFields?.experience || DEFAULT_SEARCH.experience,
        searchPeriod: initialFields?.search_period || DEFAULT_SEARCH.searchPeriod,
    });

    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        setFormValues(prev => ({
            ...prev,
            email: initialEmail,
            password: initialPassword,
            position: initialFields?.position || '',
            message: initialFields?.message || '',
            vacancyUrl: initialFields?.vacancy_url || buildVacancyUrl(DEFAULT_SEARCH),
            schedule: initialFields?.schedule || DEFAULT_SEARCH.schedule,
            orderBy: initialFields?.order_by || DEFAULT_SEARCH.orderBy,
            searchField: initialFields?.search_field || DEFAULT_SEARCH.searchField,
            experience: initialFields?.experience || DEFAULT_SEARCH.experience,
            searchPeriod: initialFields?.search_period || DEFAULT_SEARCH.searchPeriod,
        }));
    }, [initialEmail, initialPassword, initialFields]);

    const handleInputChange = useCallback((field: keyof FormValues) => (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormValues(prev => ({...prev, [field]: e.target.value}));
    }, []);

    const handleSelectChange = useCallback((param: string) => (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        const {value} = e.target;

        setFormValues(prev => ({
            ...prev,
            [param]: value,
            vacancyUrl: buildVacancyUrl({
                ...DEFAULT_SEARCH,
                schedule: param === 'schedule' ? value : prev.schedule,
                orderBy: param === 'orderBy' ? value : prev.orderBy,
                searchField: param === 'searchField' ? value : prev.searchField,
                experience: param === 'experience' ? value : prev.experience,
                searchPeriod: param === 'searchPeriod' ? value : prev.searchPeriod,
            }),
        }));
    }, []);

    return {
        formValues,
        errors,
        setErrors,
        handleInputChange,
        handleSelectChange,
    };
};

export default useSearchFormState;