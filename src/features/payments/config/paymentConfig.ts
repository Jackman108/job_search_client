import {ConfigItem} from "../../resume/types/InterfaceResume.types";

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

export const paymentStatusOptions = [
    {value: 'pending', label: 'Pending'},
    {value: 'completed', label: 'Completed'},
    {value: 'failed', label: 'Failed'},
];

export const paymentMethodOptions = [
    {value: 'webpay', label: 'WebPay'},
    {value: 'erip', label: 'ERIP'},
];

export const paymentSystemsConfig: Record<string, ConfigItem> = {
    webpay: {
        title: 'WebPay',
        apiEndpoint: '/payment/webpay',
        fields: {
            subscription_id: 'Subscription ID',
            amount: 'Amount',
        }
    },
    erip: {
        title: 'ERIP',
        apiEndpoint: '/payment/erip',
        fields: {
            subscription_id: 'Subscription ID',
            amount: 'Amount',
        }
    },
};