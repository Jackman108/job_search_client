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
import {
    normalizeEmploymentForm,
    normalizeWorkFormat,
    readEmploymentFormFromUrl,
    resolveWorkFormat,
} from '@shared/utils/hhFilterCompat';

const toUrlParams = (slice: {
    position?: string;
    workFormat?: string;
    workScheduleByDays?: string;
    workingHours?: string;
    orderBy?: string;
    searchField?: string;
    experience?: string;
    searchPeriod?: string;
    employmentForm?: string;
}) => ({
    ...DEFAULT_SEARCH,
    text: slice.position || '',
    workFormat: slice.workFormat || DEFAULT_SEARCH.workFormat,
    workScheduleByDays: slice.workScheduleByDays || DEFAULT_SEARCH.workScheduleByDays,
    workingHours: slice.workingHours || DEFAULT_SEARCH.workingHours,
    orderBy: slice.orderBy || DEFAULT_SEARCH.orderBy,
    searchField: slice.searchField || DEFAULT_SEARCH.searchField,
    experience: slice.experience || DEFAULT_SEARCH.experience,
    searchPeriod: slice.searchPeriod || DEFAULT_SEARCH.searchPeriod,
    employmentForm: slice.employmentForm || DEFAULT_SEARCH.employmentForm,
});

const blankFieldSlice = (draft?: SearchFormDraft | null) => {
    const workFormat = normalizeWorkFormat(draft?.workFormat) || DEFAULT_SEARCH.workFormat;
    const employmentForm = normalizeEmploymentForm(draft?.employmentForm) || DEFAULT_SEARCH.employmentForm;
    const workScheduleByDays = draft?.workScheduleByDays || DEFAULT_SEARCH.workScheduleByDays;
    const workingHours = draft?.workingHours || DEFAULT_SEARCH.workingHours;
    const orderBy = draft?.orderBy || DEFAULT_SEARCH.orderBy;
    const searchField = draft?.searchField || DEFAULT_SEARCH.searchField;
    const experience = draft?.experience || DEFAULT_SEARCH.experience;
    const searchPeriod = draft?.searchPeriod || DEFAULT_SEARCH.searchPeriod;
    const position = draft?.position || '';

    return {
        position,
        message: draft?.message || '',
        vacancyUrl: buildVacancyUrl(
            toUrlParams({
                position,
                workFormat,
                workScheduleByDays,
                workingHours,
                orderBy,
                searchField,
                experience,
                searchPeriod,
                employmentForm,
            }),
        ),
        workFormat,
        workScheduleByDays,
        workingHours,
        orderBy,
        searchField,
        experience,
        searchPeriod,
        employmentForm,
    };
};

const useSearchFormState = (
    initialAuths: SearchAuthData | null = null,
    initialFields: SearchFieldData | null = null,
) => {
    const initialFormValues = useMemo<FormValues>(() => {
        const draft = !initialFields ? readSearchFormDraft() : null;
        const fieldSlice = initialFields
            ? (() => {
                  const workFormat =
                      resolveWorkFormat(initialFields.vacancy_url, initialFields.schedule) || DEFAULT_SEARCH.workFormat;
                  const employmentForm =
                      readEmploymentFormFromUrl(initialFields.vacancy_url) || DEFAULT_SEARCH.employmentForm;
                  const workScheduleByDays =
                      readVacancyUrlParam(initialFields.vacancy_url, 'work_schedule_by_days') ||
                      DEFAULT_SEARCH.workScheduleByDays;
                  const workingHours =
                      readVacancyUrlParam(initialFields.vacancy_url, 'working_hours') || DEFAULT_SEARCH.workingHours;
                  return {
                      position: initialFields.position || '',
                      message: initialFields.message || '',
                      vacancyUrl: initialFields.vacancy_url || buildVacancyUrl(DEFAULT_SEARCH),
                      workFormat,
                      workScheduleByDays,
                      workingHours,
                      orderBy: initialFields.order_by || DEFAULT_SEARCH.orderBy,
                      searchField: initialFields.search_field || DEFAULT_SEARCH.searchField,
                      experience: initialFields.experience || DEFAULT_SEARCH.experience,
                      searchPeriod: initialFields.search_period || DEFAULT_SEARCH.searchPeriod,
                      employmentForm,
                  };
              })()
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
            workFormat: formValues.workFormat,
            workScheduleByDays: formValues.workScheduleByDays,
            workingHours: formValues.workingHours,
            orderBy: formValues.orderBy,
            searchField: formValues.searchField,
            experience: formValues.experience,
            searchPeriod: formValues.searchPeriod,
            employmentForm: formValues.employmentForm,
        });
    }, [
        formValues.email,
        formValues.position,
        formValues.message,
        formValues.workFormat,
        formValues.workScheduleByDays,
        formValues.workingHours,
        formValues.orderBy,
        formValues.searchField,
        formValues.experience,
        formValues.searchPeriod,
        formValues.employmentForm,
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

            setFormValues((prev) => {
                const next = {
                    ...prev,
                    [param]: value,
                } as FormValues;
                next.vacancyUrl = buildVacancyUrl(
                    toUrlParams({
                        position: next.position,
                        workFormat: next.workFormat,
                        workScheduleByDays: next.workScheduleByDays,
                        workingHours: next.workingHours,
                        orderBy: next.orderBy,
                        searchField: next.searchField,
                        experience: next.experience,
                        searchPeriod: next.searchPeriod,
                        employmentForm: next.employmentForm,
                    }),
                );
                return next;
            });
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
