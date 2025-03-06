import {PaymentItem} from "@features/payments/types/Payment.types";

export interface SubscriptionItem {
    id?: string;
    user_id?: string;
    subscription_type: string;
    price: number;
    start_date: string;
    end_date: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface SubscriptionTableBodyProps {
    subscriptionData: SubscriptionItem[];
    paymentData?: PaymentItem[];
    handleEditClick: (type: string, item: SubscriptionItem) => void;
    handleDelete: (id: string) => void;
    handlePaymentClick?: (subscription: SubscriptionItem) => void;
}

export interface SubscriptionFormProps {
    initialData?: Partial<SubscriptionItem>;
    onSubmit: (formData: Partial<SubscriptionItem>) => void;
    handleCancelClick: () => void;
    isLoading: boolean;
    isEditing?: boolean
}