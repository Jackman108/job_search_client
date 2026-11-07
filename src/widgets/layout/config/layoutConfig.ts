import { ButtonConfig } from '@type';
import ProfileSection from '@features/profile/ui/ProfileSection/ProfileSection';
import ResumeButton from '@features/resume/ui/ResumeButton/ResumeButton';
import SearchForm from '@features/vacancies/ui/SearchForm/SearchForm';
import FeedbackForm from '@features/feedback/ui/FeedbackForm/FeedbackForm';
import SubscriptionUser from '@features/subscription/ui/user/SubscriptionUser/SubscriptionUser';

export const layoutConfig: ButtonConfig<any>[] = [
    {
        icon: '/icons/run.svg',
        tooltipText: 'Отправка заявок',
        Component: SearchForm,
        position: 'left',
        requiresAuth: true,
    },
    {
        icon: '/icons/update.svg',
        tooltipText: 'Обновить результат',
        Component: FeedbackForm,
        position: 'left',
        requiresAuth: true,
    },
    {
        icon: '/icons/profile.svg',
        tooltipText: 'Профиль',
        Component: ProfileSection,
        position: 'right',
    },
    {
        icon: '/icons/resume.svg',
        tooltipText: 'Резюме',
        Component: ResumeButton,
        position: 'right',
        requiresAuth: true,
    },
    {
        icon: '/icons/subscribe.svg',
        tooltipText: 'Подписки',
        Component: SubscriptionUser,
        position: 'right',
        requiresAuth: true,
    },
];
