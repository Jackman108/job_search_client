import {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {buildVacancyUrl} from "@utils/buildVacancyUrl";
import {FormValues, SearchAuthData, SearchFieldData} from "@features/vacancies/types/SearchForm.types";
import {DEFAULT_SEARCH} from "@features/vacancies/config/searchConfig";
import {Errors} from "@shared/types/Base.types";

const useSearchFormState = (
    initialAuths: SearchAuthData | null = null,
    initialFields: SearchFieldData | null = null
) => {
    const initialFormValues = useMemo<FormValues>(() => ({
        email: initialAuths?.email || '',
        password: initialAuths?.password || '',
        position: initialFields?.position || '',
        message: initialFields?.message || '',
        vacancyUrl: initialFields?.vacancy_url || buildVacancyUrl(DEFAULT_SEARCH),
        schedule: initialFields?.schedule || DEFAULT_SEARCH.schedule,
        orderBy: initialFields?.order_by || DEFAULT_SEARCH.orderBy,
        searchField: initialFields?.search_field || DEFAULT_SEARCH.searchField,
        experience: initialFields?.experience || DEFAULT_SEARCH.experience,
        searchPeriod: initialFields?.search_period || DEFAULT_SEARCH.searchPeriod,
    }), [initialAuths, initialFields]);

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        setFormValues(initialFormValues);
    }, [initialFormValues]);

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