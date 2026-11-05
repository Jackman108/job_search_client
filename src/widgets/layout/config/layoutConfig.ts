import {ButtonConfig} from "@type";
import ProfileSection from '@features/profile/ui/ProfileSection/ProfileSection';
import ResumeButton from '@features/resume/ui/ResumeButton/ResumeButton';
import SearchForm from '@features/vacancies/ui/SearchForm/SearchForm';
import FeedbackForm from "@features/feedback/ui/FeedbackForm/FeedbackForm";
import SubscriptionUser from "@features/subscription/ui/user/SubscriptionUser/SubscriptionUser";

export const layoutConfig: ButtonConfig<any>[] = [
    {
        icon: '/icons/run.svg',
        tooltipText: 'Отправка заявок',
        Component: SearchForm,
        position: 'left',
    },
    {
        icon: '/icons/update.svg',
        tooltipText: 'Обновить результат',
        Component: FeedbackForm,
        position: 'left',
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
    },
    {
        icon: '/icons/subscribe.svg',
        tooltipText: 'Подписки',
        Component: SubscriptionUser,
        position: 'right',
    },
];