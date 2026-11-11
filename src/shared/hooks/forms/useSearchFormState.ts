import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { buildVacancyUrl } from '@utils';
import { Errors } from '@type';
import { DEFAULT_SEARCH, FormValues, SearchAuthData, SearchFieldData } from '@entities/search';
import { clearSearchFormDraft, readSearchFormDraft, writeSearchFormDraft } from '@shared/utils/searchFormDraft.utils';

const blankFieldSlice = (draft?: { position: string; message: string } | null) => ({
    position: draft?.position || '',
    message: draft?.message || '',
    vacancyUrl: buildVacancyUrl(DEFAULT_SEARCH),
    schedule: DEFAULT_SEARCH.schedule,
    orderBy: DEFAULT_SEARCH.orderBy,
    searchField: DEFAULT_SEARCH.searchField,
    experience: DEFAULT_SEARCH.experience,
    searchPeriod: DEFAULT_SEARCH.searchPeriod,
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
              }
            : blankFieldSlice(draft);

        return {
            email: initialAuths?.email || '',
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
        writeSearchFormDraft({ position: formValues.position, message: formValues.message });
    }, [formValues.position, formValues.message, initialFields]);

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
        setFormValues((prev) => ({ ...prev, ...blankFieldSlice(draft) }));
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
                }),
            }));
        },
        [],
    );

    return {
        formValues,
        errors,
        setErrors,
        setFormValues,
        resetAuthToBlank,
        resetFieldToBlank,
        handleInputChange,
        handleSelectChange,
    };
};

export default useSearchFormState;
