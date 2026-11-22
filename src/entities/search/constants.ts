import { FormConfig } from './types/SearchForm.types';

/** HH Magritte filter defaults for URL building — no seeded position/message for users. */
export const DEFAULT_SEARCH = {
    text: '',
    /** HH area id: Moscow — avoids zero SERP when HH account region is e.g. Жлобин. */
    area: '1',
    workFormat: 'REMOTE',
    workScheduleByDays: '',
    workingHours: '',
    oredClusters: 'true',
    orderBy: 'salary_desc',
    searchField: 'name',
    experience: '',
    searchPeriod: '3',
    employmentForm: '',
};

export const FORM_TEXTS = {
    vacancyUrlLabel: 'Ссылка с фильтрами на вакансии',
    emailLabel: 'E-mail',
    passwordLabel: 'Пароль',
    positionLabel: 'Название вакансии',
    messageLabel: 'Письмо',
};

export const FORM_LABELS = {
    searchField: 'Поиск по полям',
    workFormat: 'Формат работы',
    workScheduleByDays: 'График работы',
    workingHours: 'Рабочие часы',
    experience: 'Опыт работы',
    employmentForm: 'Тип занятости',
    searchPeriod: 'Период поиска',
    orderBy: 'Порядок',
};

export const FORM_PARAMS = {
    searchField: 'searchField',
    workFormat: 'workFormat',
    workScheduleByDays: 'workScheduleByDays',
    workingHours: 'workingHours',
    experience: 'experience',
    employmentForm: 'employmentForm',
    searchPeriod: 'searchPeriod',
    orderBy: 'orderBy',
} as const;

const ANY = { value: '', label: 'Любой' } as const;

export const FORM_CONFIG: FormConfig = {
    fields: {
        email: {
            label: 'E-mail',
            type: 'email',
            placeholder: '',
            required: true,
        },
        password: {
            label: 'Пароль',
            type: 'password',
            placeholder: '',
            required: true,
        },
        vacancyUrl: {
            label: 'Ссылка с фильтрами на вакансии',
            type: 'text',
            placeholder: '',
            required: true,
        },
        position: {
            label: 'Название вакансии',
            type: 'text',
            placeholder: '',
            required: true,
        },
    },

    options: {
        searchField: [
            { value: 'name', label: 'В названии вакансии' },
            { value: 'company_name', label: 'В названии компании' },
            { value: 'description', label: 'В описании вакансии' },
        ],
        workFormat: [
            ANY,
            { value: 'ON_SITE', label: 'На месте работодателя' },
            { value: 'REMOTE', label: 'Удалённо' },
            { value: 'HYBRID', label: 'Гибрид' },
            { value: 'FIELD_WORK', label: 'Разъездной' },
        ],
        workScheduleByDays: [
            ANY,
            { value: 'FIVE_ON_TWO_OFF', label: '5/2' },
            { value: 'SIX_ON_ONE_OFF', label: '6/1' },
            { value: 'FOUR_ON_FOUR_OFF', label: '4/4' },
            { value: 'FOUR_ON_THREE_OFF', label: '4/3' },
            { value: 'FOUR_ON_TWO_OFF', label: '4/2' },
            { value: 'THREE_ON_THREE_OFF', label: '3/3' },
            { value: 'THREE_ON_TWO_OFF', label: '3/2' },
            { value: 'TWO_ON_TWO_OFF', label: '2/2' },
            { value: 'TWO_ON_ONE_OFF', label: '2/1' },
            { value: 'ONE_ON_THREE_OFF', label: '1/3' },
            { value: 'ONE_ON_TWO_OFF', label: '1/2' },
            { value: 'WEEKEND', label: 'По выходным' },
            { value: 'FLEXIBLE', label: 'Свободный' },
            { value: 'OTHER', label: 'Другое' },
        ],
        workingHours: [
            ANY,
            { value: 'HOURS_2', label: '2 часа' },
            { value: 'HOURS_3', label: '3 часа' },
            { value: 'HOURS_4', label: '4 часа' },
            { value: 'HOURS_5', label: '5 часов' },
            { value: 'HOURS_6', label: '6 часов' },
            { value: 'HOURS_7', label: '7 часов' },
            { value: 'HOURS_8', label: '8 часов' },
            { value: 'HOURS_9', label: '9 часов' },
            { value: 'HOURS_10', label: '10 часов' },
            { value: 'HOURS_11', label: '11 часов' },
            { value: 'HOURS_12', label: '12 часов' },
            { value: 'HOURS_24', label: '24 часа' },
            { value: 'FLEXIBLE', label: 'По договорённости' },
            { value: 'OTHER', label: 'Другое' },
        ],
        experience: [
            { value: '', label: 'Не важно' },
            { value: 'noExperience', label: 'Нет опыта' },
            { value: 'between1And3', label: 'От 1 года до 3 лет' },
            { value: 'between3And6', label: 'От 3 до 6 лет' },
            { value: 'moreThan6', label: 'Более 6 лет' },
        ],
        employmentForm: [
            { value: '', label: 'Любая' },
            { value: 'FULL', label: 'Полная занятость' },
            { value: 'PART', label: 'Частичная занятость' },
            { value: 'PROJECT', label: 'Подработка' },
            { value: 'FLY_IN_FLY_OUT', label: 'Вахта' },
            { value: 'internship', label: 'Стажировка' },
        ],
        searchPeriod: [
            { value: '1', label: 'За сутки' },
            { value: '3', label: 'За три дня' },
            { value: '7', label: 'За неделю' },
            { value: '30', label: 'За месяц' },
            { value: '0', label: 'За всё время' },
        ],
        orderBy: [
            { value: 'relevance', label: 'По соответствию' },
            { value: 'publication_time', label: 'По дате' },
            { value: 'salary_desc', label: 'По убыванию дохода' },
            { value: 'salary_asc', label: 'По возрастанию дохода' },
            { value: 'distance', label: 'По удалённости' },
        ],
    },
} as const;
