import { ConfigItem } from "@type";

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
    nowpayments: {
        title: 'NowPayments',
        apiEndpoint: '/payment/nowpayments',
        fields: {
            id: 'ID',
            subscription_id: 'Subscription ID',
            amount: 'Amount',
            currency: 'Currency',
            network: 'Network',
            crypto_address: 'Crypto Address',
            crypto_amount: 'Crypto Amount',
            status: 'Status',
            created_at: 'Created At',
            expires_at: 'Expires At',
            transaction_hash: 'Transaction Hash',
            wallet_provider: 'Wallet Provider'
        }
    }
};