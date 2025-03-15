import {ButtonConfig} from "@type";
import ProfileButton from '@features/profile/ui/ProfileButton';
import ResumeButton from '@features/resume/ui/ResumeButton/ResumeButton';
import SearchForm from '@features/vacancies/ui/SearchForm/SearchForm';
import FeedbackForm from "@features/feedback/ui/FeedbackForm/FeedbackForm";
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
        Component: ProfileButton,
        position: 'right',
    },
    {
        icon: '/resume.png',
        tooltipText: 'Резюме',
        Component: ResumeButton,
        position: 'right',
    },
    {
        icon: '/subscribe.png',
        tooltipText: 'Подписки',
        Component: SubscriptionUser,
        position: 'right',
    },
];