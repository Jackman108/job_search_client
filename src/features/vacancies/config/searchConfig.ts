import {FormConfig} from "../types/SearchForm.types";

export const DEFAULT_SEARCH = {
    text: 'Middle frontend developer',
    schedule: 'remote',
    oredClusters: 'true',
    orderBy: 'salary_desc',
    searchField: 'name',
    experience: 'between3And6',
    searchPeriod: '3',
};

export const FORM_TEXTS = {
    vacancyUrlLabel: 'Ссылка с фильтрами на вакансии',
    emailLabel: 'E-mail',
    passwordLabel: 'Пароль',
    positionLabel: 'Название вакансии',
    messageLabel: 'Письмо',
};


export const FORM_LABELS = {
    schedule: 'График работы',
    orderBy: 'Порядок',
    searchField: 'Поиск по полям',
    experience: 'Опыт работы',
    searchPeriod: 'Период поиска',
};

export const FORM_PARAMS = {
    schedule: 'schedule',
    orderBy: 'orderBy',
    searchField: 'searchField',
    experience: 'experience',
    searchPeriod: 'searchPeriod',
} as const;

export const FORM_CONFIG: FormConfig = {
    fields: {
        email: {
            label: 'E-mail',
            type: 'email',
            placeholder: 'Введите ваш email',
            required: true,
        },
        password: {
            label: 'Пароль',
            type: 'password',
            placeholder: 'Введите ваш пароль',
            required: true,
        },
        vacancyUrl: {
            label: 'Ссылка с фильтрами на вакансии',
            type: 'text',
            placeholder: 'Введите ссылку на вакансию',
            required: true,
        },
        position: {
            label: 'Название вакансии',
            type: 'text',
            placeholder: 'Введите название вакансии',
            required: true,
        },
    },

    options: {
        schedule: [
            {value: 'remote', label: 'Удаленная работа'},
            {value: 'fullDay', label: 'Полный день'},
            {value: 'flexible', label: 'Гибкий график'},
            {value: 'shift', label: 'Сменный график'},
        ],
        orderBy: [
            {value: 'salary_desc', label: 'По убыванию зарплаты'},
            {value: 'salary_asc', label: 'По возрастанию зарплаты'},
            {value: 'publication_time', label: 'По дате'},
            {value: 'relevance', label: 'По соответствию'},
        ],
        searchField: [
            {value: 'name', label: 'По названию'},
            {value: 'company', label: 'По компании'},
            {value: 'description', label: 'По описанию'},
        ],
        experience: [
            {value: 'between1And3', label: 'От 1 до 3 лет'},
            {value: 'between3And6', label: 'От 3 до 6 лет'},
            {value: 'moreThan6', label: 'Более 6 лет'},
            {value: '', label: 'Нет опыта'},
        ],
        searchPeriod: [
            {value: '1', label: '1 день'},
            {value: '3', label: '3 дня'},
            {value: '7', label: 'Неделя'},
        ],
    },
} as const;

export type FormParams = keyof typeof FORM_PARAMS;
export type FormLabelKeys = keyof typeof FORM_LABELS;
export type FormParamKeys = keyof typeof FORM_PARAMS;