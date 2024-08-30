// src/config/buttonConfigs.ts
import VacancyForm from '../components/VacancyForm/VacancyForm';
import Profile from '../components/Profile/Profile';
import { ButtonConfig } from '../Interfaces/InterfaceComponent.types';

export const buttonConfigs: ButtonConfig<any>[] = [
    {
        icon: '/run.png',
        tooltipText: 'Отправка заявок',
        Component: VacancyForm,
        position: 'left',
    },
    {
        icon: '/profile.png',
        tooltipText: 'Профиль',
        Component: Profile,
        position: 'right',
    },
];
