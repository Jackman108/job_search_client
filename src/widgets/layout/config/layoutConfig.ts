import {ButtonConfig} from "@type";
import ProfileSection from '@features/profile/ui/ProfileSection/ProfileSection';
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
        Component: ProfileSection,
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