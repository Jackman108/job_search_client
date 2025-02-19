import {ConfigItem} from "@features/resume/types/InterfaceResume.types";

export const subscriptionConfig: Record<string, ConfigItem> = {
    subscription: {
        title: 'Подписки',
        apiEndpoint: '/subscription',
        fields: {
            id: 'ID',
            userId: 'User ID',
            subscriptionType: 'Subscription Type',
            price: 'Price',
            startDate: 'Start Date',
            endDate: 'End Date',
            createdAt: 'Created At',
            updatedAt: 'Updated At'
        },
    },
};
