// src/config/buttonConfigs.ts
import { ButtonConfig } from '../Interfaces/InterfaceComponent.types';
import Profile from '../components/Profile/Profile';
import Resume from '../components/Resume/ResumeButton/ResumeButton';
import VacancyForm from '../components/VacancyForm/VacancyForm';

export const buttonConfigs: ButtonConfig<any>[] = [
    {
        icon: '/run.png',
        tooltipText: 'Отправка заявок',
        Component: VacancyForm,
        position: 'left',
    },
    {
        icon: '/update.png',
        tooltipText: 'Обновить результат',
        Component: Resume,
        position: 'left',
    },
    {
        icon: '/profile.png',
        tooltipText: 'Профиль',
        Component: Profile,
        position: 'right',
    },
    {
        icon: '/resume.png',
        tooltipText: 'Резюме',
        Component: Resume,
        position: 'right',
    },
];
