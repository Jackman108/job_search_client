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
        /*contacts: {
        title: 'Контакты',
        apiEndpoint: (userId: string) => `/contacts/${userId}`,
        fields: {
            phone: 'Телефон',
            email: 'Email',
            personalSite: 'Личный сайт'
        }
    },
skills: {
        title: 'Навыки',
        apiEndpoint: (userId: string) => `/skills/${userId}`,
        fields: {
            skillName: 'Навык',
            proficiencyLevel: 'Уровень'
        }
    },
    workExperience: {
        title: 'Опыт работы',
        apiEndpoint: (userId: string) => `/work_experience/${userId}`,
        fields: {
            companyName: 'Компания',
            position: 'Должность',
            startDate: 'Дата начала',
            endDate: 'Дата окончания',
            description: 'Описание'
        }
    }*/
};
