import { ConfigItem } from '@type';

export const vacancyConfig: Record<string, ConfigItem> = {
    vacancy: {
        title: 'Vacancies',
        apiEndpoint: '/vacancy',
        fields: {
            id: 'ID',
            title_vacancy: 'Position',
            url_vacancy: 'Vacancy URL',
            title_company: 'Company',
            url_company: 'Company URL',
            vacancy_status: 'Status',
            response_date: 'Response Date',
        },
    },
}; 