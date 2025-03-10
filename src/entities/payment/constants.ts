export const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
} as const;

export const PAYMENT_STATUS_OPTIONS = [
    {value: PAYMENT_STATUS.PENDING, label: 'Pending'},
    {value: PAYMENT_STATUS.COMPLETED, label: 'Completed'},
    {value: PAYMENT_STATUS.FAILED, label: 'Failed'},
];

export const PAYMENT_METHOD = {
    WEBPAY: 'webpay',
    ERIP: 'erip',
} as const;

export const PAYMENT_METHOD_OPTIONS = [
    {value: PAYMENT_METHOD.WEBPAY, label: 'WebPay'},
    {value: PAYMENT_METHOD.ERIP, label: 'ERIP'},
];