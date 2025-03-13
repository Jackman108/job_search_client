import {ButtonConfig} from "@type";
import Profile from '@features/profile/ui/Profile';
import Resume from '@features/resume/ui/ResumeButton/ResumeButton';
import SearchForm from '@features/vacancies/ui/SearchForm/SearchForm';
import FeedbackForm from "@features/feedback/ui/FeedbackForm";
import SubscriptionUser from "@features/subscription/ui/user/SubscriptionUser/SubscriptionUser";

export const layoutConfig: ButtonConfig<any>[] = [
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
    {
        icon: '/subscribe.png',
        tooltipText: 'Подписки',
        Component: SubscriptionUser,
        position: 'right',
    },
];
