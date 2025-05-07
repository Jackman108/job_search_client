import {PAYMENT_METHOD, PAYMENT_STATUS} from "@entities/payment";

export interface PaymentTypes {
    id?: string;
    subscription_id: string;
    amount: number;
    payment_status: string;
    payment_method?: string;
    currency?: string;
    network?: string;
    created_at?: Date;
    updated_at?: Date;
}

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
export type PaymentMethod = typeof PAYMENT_METHOD[keyof typeof PAYMENT_METHOD];

export interface PaymentStatusOption {
    value: PaymentStatus;
    label: string;
}

export interface PaymentMethodOption {
    value: PaymentMethod;
    label: string;
}