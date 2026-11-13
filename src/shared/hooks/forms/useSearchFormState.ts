import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { buildVacancyUrl, readVacancyUrlParam } from '@utils';
import { Errors } from '@type';
import { DEFAULT_SEARCH, FormValues, SearchAuthData, SearchFieldData } from '@entities/search';
import {
    clearSearchFormDraft,
    readSearchFormDraft,
    writeSearchFormDraft,
    type SearchFormDraft,
} from '@shared/utils/searchFormDraft.utils';

const blankFieldSlice = (draft?: SearchFormDraft | null) => ({
    position: draft?.position || '',
    message: draft?.message || '',
    vacancyUrl: buildVacancyUrl({
        ...DEFAULT_SEARCH,
        text: draft?.position || '',
        schedule: draft?.schedule || DEFAULT_SEARCH.schedule,
        orderBy: draft?.orderBy || DEFAULT_SEARCH.orderBy,
        searchField: draft?.searchField || DEFAULT_SEARCH.searchField,
        experience: draft?.experience || DEFAULT_SEARCH.experience,
        searchPeriod: draft?.searchPeriod || DEFAULT_SEARCH.searchPeriod,
        employment: draft?.employment || DEFAULT_SEARCH.employment,
    }),
    schedule: draft?.schedule || DEFAULT_SEARCH.schedule,
    orderBy: draft?.orderBy || DEFAULT_SEARCH.orderBy,
    searchField: draft?.searchField || DEFAULT_SEARCH.searchField,
    experience: draft?.experience || DEFAULT_SEARCH.experience,
    searchPeriod: draft?.searchPeriod || DEFAULT_SEARCH.searchPeriod,
    employment: draft?.employment || DEFAULT_SEARCH.employment,
});

const useSearchFormState = (
    initialAuths: SearchAuthData | null = null,
    initialFields: SearchFieldData | null = null,
) => {
    const initialFormValues = useMemo<FormValues>(() => {
        const draft = !initialFields ? readSearchFormDraft() : null;
        const fieldSlice = initialFields
            ? {
                  position: initialFields.position || '',
                  message: initialFields.message || '',
                  vacancyUrl: initialFields.vacancy_url || buildVacancyUrl(DEFAULT_SEARCH),
                  schedule: initialFields.schedule || DEFAULT_SEARCH.schedule,
                  orderBy: initialFields.order_by || DEFAULT_SEARCH.orderBy,
                  searchField: initialFields.search_field || DEFAULT_SEARCH.searchField,
                  experience: initialFields.experience || DEFAULT_SEARCH.experience,
                  searchPeriod: initialFields.search_period || DEFAULT_SEARCH.searchPeriod,
                  // No DB column: employment lives in the persisted vacancy_url.
                  employment: readVacancyUrlParam(initialFields.vacancy_url, 'employment'),
              }
            : blankFieldSlice(draft);

        return {
            // Never restore password from local draft.
            email: initialAuths?.email || (!initialAuths ? draft?.email || '' : ''),
            password: initialAuths?.password || '',
            ...fieldSlice,
        };
    }, [initialAuths, initialFields]);

    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        setFormValues(initialFormValues);
    }, [initialFormValues]);

    useEffect(() => {
        if (initialFields) return;
        writeSearchFormDraft({
            email: formValues.email,
            position: formValues.position,
            message: formValues.message,
            schedule: formValues.schedule,
            orderBy: formValues.orderBy,
            searchField: formValues.searchField,
            experience: formValues.experience,
            searchPeriod: formValues.searchPeriod,
            employment: formValues.employment,
        });
    }, [
        formValues.email,
        formValues.position,
        formValues.message,
        formValues.schedule,
        formValues.orderBy,
        formValues.searchField,
        formValues.experience,
        formValues.searchPeriod,
        formValues.employment,
        initialFields,
    ]);

    const resetAuthToBlank = useCallback(() => {
        setFormValues((prev) => ({ ...prev, email: '', password: '' }));
        setErrors((prev) => {
            const next = { ...prev };
            delete next.email;
            delete next.password;
            return next;
        });
    }, []);

    const resetFieldToBlank = useCallback((opts?: { keepDraft?: boolean }) => {
        const draft = opts?.keepDraft ? readSearchFormDraft() : null;
        if (!opts?.keepDraft) {
            clearSearchFormDraft();
        }
        setFormValues((prev) => ({
            ...prev,
            ...blankFieldSlice(draft),
            email: opts?.keepDraft ? draft?.email || prev.email : '',
            password: '',
        }));
    }, []);

    const handleInputChange = useCallback(
        (field: keyof FormValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
        },
        [],
    );

    const handleSelectChange = useCallback(
        (param: string) => (e: ChangeEvent<HTMLSelectElement>) => {
            const { value } = e.target;

            setFormValues((prev) => ({
                ...prev,
                [param]: value,
                vacancyUrl: buildVacancyUrl({
                    ...DEFAULT_SEARCH,
                    text: prev.position || '',
                    schedule: param === 'schedule' ? value : prev.schedule,
                    orderBy: param === 'orderBy' ? value : prev.orderBy,
                    searchField: param === 'searchField' ? value : prev.searchField,
                    experience: param === 'experience' ? value : prev.experience,
                    searchPeriod: param === 'searchPeriod' ? value : prev.searchPeriod,
                    employment: param === 'employment' ? value : prev.employment,
                }),
            }));
        },
        [],
    );

    const isDirty = useMemo(
        () =>
            (Object.keys(initialFormValues) as (keyof FormValues)[]).some(
                (key) => formValues[key] !== initialFormValues[key],
            ),
        [formValues, initialFormValues],
    );

    return {
        formValues,
        errors,
        setErrors,
        setFormValues,
        isDirty,
        resetAuthToBlank,
        resetFieldToBlank,
        handleInputChange,
        handleSelectChange,
    };
};

export default useSearchFormState;
