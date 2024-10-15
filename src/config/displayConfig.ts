import { ConfigItem } from "../Interfaces/InterfaceDataDisplay.types";

export const dataDisplayConfig: Record<string, ConfigItem> = {
    resume: {
        title: 'Резюме',
        apiEndpoint: (userId: string) => `/resume/${userId}`,
        fields: {
            full_name: 'Полное имя',
            position: 'Должность',
            employment_type: 'Тип занятости',
            work_schedule: 'График работы',
            travel_time: 'Время на дорогу',
            business_trip_readiness: 'Готовность к командировкам'
        },
    },
    contacts: {
        title: 'Контакты',
        apiEndpoint: (userId: string) => `/contacts/${userId}`,
        fields: {
            phone: 'Телефон',
            email: 'Email',
            personal_site: 'Личный сайт'
        }
    },

    skills: {
        title: 'Навыки',
        apiEndpoint: (userId: string) => `/skills/${userId}`,
        fields: {
            skill_name: 'Навык',
            proficiency_level: 'Уровень'
        }
    },
    workExperience: {
        title: 'Опыт работы',
        apiEndpoint: (userId: string) => `/work_experience/${userId}`,
        fields: {
            company_name: 'Компания',
            position: 'Должность',
            start_date: 'Дата начала',
            end_date: 'Дата окончания',
            description: 'Описание'
        }
    }
};
