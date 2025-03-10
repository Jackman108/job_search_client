import {SUBSCRIPTION_TYPES} from "@entities/subscription";

export interface SubscriptionTypes {
    id?: string;
    user_id?: string;
    subscription_type: SubscriptionVariant;
    price: number;
    start_date: string;
    end_date: string;
    created_at?: Date;
    updated_at?: Date;
}

export type SubscriptionVariant = typeof SUBSCRIPTION_TYPES[keyof typeof SUBSCRIPTION_TYPES];

export interface SubscriptionVariantOption {
    value: SubscriptionVariant;
    label: string;
    price: number;
}
