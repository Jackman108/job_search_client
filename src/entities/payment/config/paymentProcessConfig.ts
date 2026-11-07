import { ConfigItem } from '@type';

export const paymentProcessConfig: Record<string, ConfigItem> = {
    webpay: {
        title: 'WebPay',
        apiEndpoint: '/payment/webpay',
        fields: {
            payment_id: 'Payment ID',
            amount: 'Amount',
            payment_status: 'Payment Status',
        },
    },
    erip: {
        title: 'ERIP',
        apiEndpoint: '/payment/erip',
        fields: {
            payment_id: 'Payment ID',
            amount: 'Amount',
            payment_status: 'Payment Status',
        },
    },
    nowpayments: {
        title: 'NowPayments',
        apiEndpoint: '/payment/nowpayments',
        fields: {
            id: 'ID',
            payment_id: 'Payment ID',
            amount: 'Amount',
            currency: 'Currency',
            network: 'Network',
            crypto_address: 'Crypto Address',
            crypto_amount: 'Crypto Amount',
            payment_status: 'Payment Status',
            created_at: 'Created At',
            expires_at: 'Expires At',
            transaction_hash: 'Transaction Hash',
            wallet_provider: 'Wallet Provider',
        },
    },
};
