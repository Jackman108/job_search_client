import { ButtonConfig } from '@type';
import ResumeButton from '@features/resume/ui/ResumeButton/ResumeButton';
import SearchForm from '@features/vacancies/ui/SearchForm/SearchForm';
import SubscriptionPanel from '../../subscription/ui/SubscriptionPanel';
import ProfilePanel from '../../profile/ui/ProfilePanel';
import { NotificationsPanel } from '@features/notifications';

export const layoutConfig: ButtonConfig<any>[] = [
    {
        icon: '/icons/run.svg',
        tooltipText: 'Отправка заявок',
        Component: SearchForm,
        position: 'left',
        requiresAuth: true,
        // Apply + refresh both live in SearchForm toggles — badge/spinner on this tab only.
        jobKind: 'sendFeedback',
        jobKinds: ['sendFeedback', 'getFeedback'],
    },
    {
        icon: '/icons/profile.svg',
        tooltipText: 'Профиль',
        Component: ProfilePanel,
        position: 'right',
    },
    {
        icon: '/icons/bell.svg',
        tooltipText: 'Уведомления',
        Component: NotificationsPanel,
        position: 'right',
        requiresAuth: true,
    },
    {
        icon: '/icons/resume.svg',
        tooltipText: 'Резюме',
        Component: ResumeButton,
        position: 'right',
        requiresAuth: true,
        jobKind: 'syncResume',
        jobKinds: ['syncResume'],
    },
    {
        icon: '/icons/subscribe.svg',
        tooltipText: 'Подписки',
        Component: SubscriptionPanel,
        position: 'right',
        requiresAuth: true,
    },
];
