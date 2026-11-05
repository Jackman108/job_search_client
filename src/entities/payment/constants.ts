export const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    EXPIRED: 'expired',
} as const;

export const PAYMENT_STATUS_OPTIONS = [
    { value: PAYMENT_STATUS.PENDING, label: 'Pending' },
    { value: PAYMENT_STATUS.COMPLETED, label: 'Completed' },
    { value: PAYMENT_STATUS.FAILED, label: 'Failed' },
    { value: PAYMENT_STATUS.EXPIRED, label: 'Expired' },
];

export const PAYMENT_METHOD = {
    WEBPAY: 'webpay',
    ERIP: 'erip',
    CRYPTO: 'crypto',
} as const;

export const PAYMENT_METHOD_OPTIONS = [
    { value: PAYMENT_METHOD.WEBPAY, label: 'WebPay' },
    { value: PAYMENT_METHOD.ERIP, label: 'ERIP' },
    { value: PAYMENT_METHOD.CRYPTO, label: 'Crypto' },
];