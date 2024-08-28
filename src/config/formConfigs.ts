// src/config/formConfigs.ts
export const DEFAULT_VACANCY_PARAMS = {
    text: 'Middle frontend developer',
    schedule: 'remote',
    oredClusters: 'true',
    orderBy: 'salary_desc',
    searchField: 'name',
    experience: 'between3And6',
    searchPeriod: '3',
};

export const OPTIONS = {
    schedule: [
        { value: 'remote', label: 'Удаленная работа' },
        { value: 'fullDay', label: 'Полный день' },
        { value: 'flexible', label: 'Гибкий график' },
        { value: 'shift', label: 'Сменный график' },
    ],
    orderBy: [
        { value: 'salary_desc', label: 'По убыванию зарплаты' },
        { value: 'salary_asc', label: 'По возрастанию зарплаты' },
        { value: 'publication_time', label: 'По дате' },
        { value: 'relevance', label: 'По соответствию' },
    ],
    searchField: [
        { value: 'name', label: 'По названию' },
        { value: 'company', label: 'По компании' },
        { value: 'description', label: 'По описанию' },
    ],
    experience: [
        { value: 'between1And3', label: 'От 1 до 3 лет' },
        { value: 'between3And6', label: 'От 3 до 6 лет' },
        { value: 'moreThan6', label: 'Более 6 лет' },
        { value: '', label: 'Нет опыта' },
    ],
    searchPeriod: [
        { value: '1', label: '1 день' },
        { value: '3', label: '3 дня' },
        { value: '7', label: 'Неделя' },
    ],
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

export const FORM_BUTTONS = {
    isLoading: 'Загрузка...',
    submitButton: 'Начать',
    stopButton: 'Остановить',
    closeButton: 'Закрыть',
    SignInButton: 'Вход',
    SignOutButton: 'Выход',
    SignUpButton: 'Регистрация',
};

export const ERROR_MESSAGES = {
    vacancyUrl: 'Укажите ссылку на вакансии',
    email: 'Укажите корректный e-mail',
    password: 'Введите пароль',
    position: 'Введите название вакансии',
};

export const FORM_PARAMS = {
    schedule: 'schedule',
    orderBy: 'orderBy',
    searchField: 'searchField',
    experience: 'experience',
    searchPeriod: 'searchPeriod',
} as const;

export const USER_TEXTS = {
    profileTitle: 'Профиль',
    firstNameLabel: 'Имя',
    lastNameLabel: 'Фамилия',
    avatarLabel: 'Аватар',
    balanceLabel: 'Баланс',
    spinCountLabel: 'Количество вращений',
    successfulResponsesLabel: 'Успешные отклики',
    currentStatusLabel: 'Текущий статус',
    noAvatar: 'Нет',
  };
  
  export const BUTTON_TEXTS = {
    saveButton: 'Сохранить',
    cancelButton: 'Отмена',
    editButton: 'Редактировать',
    signOutButton: 'Выйти',
    emailButton: 'email',
    passwordButton: 'password',
    passwordRepeat: 'passwordRepeat',
    loadingButton: 'Загрузка...',
    insertButton: 'Войти',
    registerButton: 'Зарегистрироваться',
    insertPasswordButton: 'Введиите пароль',
    replacePasswordButton: 'Повторите пароль',
  };

  export const DEFAULT_AVATAR_URL = 'https://polinka.top/uploads/posts/2023-06/1686471538_polinka-top-p-kartinka-dlya-profilya-muzhskoi-vkontakte-17.jpg';

  
export type FormParams = keyof typeof FORM_PARAMS;

