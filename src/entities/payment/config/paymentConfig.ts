import {ConfigItem} from "@type";

export const paymentConfig: Record<string, ConfigItem> = {
    payment: {
        title: 'Платежи',
        apiEndpoint: '/payment',
        fields: {
            id: 'ID',
            user_id: 'User ID',
            subscription_id: 'Subscription ID',
            amount: 'Amount',
            payment_status: 'Payment Status',
            payment_method: 'Payment Method',
            created_at: 'Created At',
            updated_at: 'Updated At'
        },
    },
};

