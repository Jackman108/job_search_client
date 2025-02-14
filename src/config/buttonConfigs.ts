import {ButtonConfig} from '../Interfaces/InterfaceComponent.types';
import Profile from '../components/Profile/Profile';
import Resume from '../components/Resume/ResumeButton/ResumeButton';
import SearchForm from '../components/SearchForm/SearchForm';
import FeedbackForm from "../components/FeedbackForm/FeedbackForm";

export const buttonConfigs: ButtonConfig<any>[] = [
    {
        icon: '/run.png',
        tooltipText: 'Отправка заявок',
        Component: SearchForm,
        position: 'left',
    },
    {
        icon: '/update.png',
        tooltipText: 'Обновить результат',
        Component: FeedbackForm,
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
