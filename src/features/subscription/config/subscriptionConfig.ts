import {ConfigItem} from "@features/resume/types/InterfaceResume.types";

export const subscriptionConfig: Record<string, ConfigItem> = {
    subscription: {
        title: 'Подписки',
        apiEndpoint: '/subscription',
        fields: {
            id: 'ID',
            user_id: 'User ID',
            subscription_type: 'SubscriptionType',
            price: 'Price',
            start_date: 'Start Date',
            end_date: 'End Date',
            created_at: 'Created At',
            updated_at: 'Updated At'
        },
    },
};

export const subscriptionTypeOptions = [
    {value: 'daily', label: 'Basic'},
    {value: 'weekly', label: 'Premium'},
    {value: 'monthly', label: 'Gold'},
];