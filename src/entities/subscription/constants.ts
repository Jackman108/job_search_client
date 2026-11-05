export const SUBSCRIPTION_TYPES = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
} as const;

export const SUBSCRIPTION_TYPE_OPTIONS = [
    {value: SUBSCRIPTION_TYPES.DAILY, label: 'Basic', price: 3},
    {value: SUBSCRIPTION_TYPES.WEEKLY, label: 'Premium', price: 15},
    {value: SUBSCRIPTION_TYPES.MONTHLY, label: 'Gold', price: 50},
];