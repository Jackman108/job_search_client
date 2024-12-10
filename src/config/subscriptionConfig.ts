import { ConfigItem } from "../Interfaces/InterfaceResume.types";

export const dateSubscriptionConfig: Record<string, ConfigItem> = {
    subscription: {
        title: 'Подписки',
        apiEndpoint: () => `/subscription`,
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
