import {ConfigItem} from "@type";

export const paymentProcessConfig: Record<string, ConfigItem> = {
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