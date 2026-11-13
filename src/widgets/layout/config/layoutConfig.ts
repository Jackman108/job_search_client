import { ButtonConfig } from '@type';
import ResumeButton from '@features/resume/ui/ResumeButton/ResumeButton';
import SearchForm from '@features/vacancies/ui/SearchForm/SearchForm';
import RefreshResultSlot from '@features/feedback/ui/RefreshResultSlot/RefreshResultSlot';
import SubscriptionPanel from '../../subscription/ui/SubscriptionPanel';
import ProfilePanel from '../../profile/ui/ProfilePanel';

export const layoutConfig: ButtonConfig<any>[] = [
    {
        icon: '/icons/run.svg',
        tooltipText: 'Отправка заявок',
        Component: SearchForm,
        position: 'left',
        requiresAuth: true,
        jobKind: 'sendFeedback',
    },
    {
        icon: '/icons/update.svg',
        tooltipText: 'Обновить результат',
        Component: RefreshResultSlot,
        position: 'left',
        requiresAuth: true,
        // Empty panel UI; jobKind kept so sidebar badge tracks getFeedback.
        jobKind: 'getFeedback',
    },
    {
        icon: '/icons/profile.svg',
        tooltipText: 'Профиль',
        Component: ProfilePanel,
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
        Component: SubscriptionPanel,
        position: 'right',
        requiresAuth: true,
    },
];
