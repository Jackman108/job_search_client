import { PAYMENT_METHOD, PAYMENT_STATUS } from '@entities/payment/constants';

/**
 * Базовый интерфейс для всех типов платежей
 */
export interface BasePayment {
    /** Уникальный идентификатор платежа */
    id: string;
    /** ID подписки */
    subscription_id: string;
    /** Сумма платежа */
    amount: number;
    /** Статус платежа */
    payment_status: typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
    /** Метод оплаты */
    payment_method?: typeof PAYMENT_METHOD[keyof typeof PAYMENT_METHOD];
    /** Валюта платежа */
    currency?: string;
    /** Сеть платежа (например, BTC, ETH) */
    network?: string;
    /** Дата создания */
    created_at?: Date;
    /** Дата обновления */
    updated_at?: Date;
}

/**
 * Типы статусов платежа
 */
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
export type PaymentMethod = typeof PAYMENT_METHOD[keyof typeof PAYMENT_METHOD];

/**
 * Опции для выбора статуса платежа
 */
export interface PaymentStatusOption {
    value: PaymentStatus;
    label: string;
}

/**
 * Опции для выбора метода оплаты
 */
export interface PaymentMethodOption {
    value: PaymentMethod;
    label: string;
} 