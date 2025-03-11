import {SubscriptionTypes} from "@entities/subscription";
import {PaymentTypes} from "@entities/payment";

export interface SubscriptionTableBodyProps {
    subscriptionData: SubscriptionTypes [];
    paymentData?: PaymentTypes[];
    subscribeEditClick: (type: string, item: SubscriptionTypes) => void;
    subscribeDelete: (id: string) => void;
    handlePaymentClick?: (subscription: SubscriptionTypes) => void;
}

export interface SubscriptionFormProps {
    initialData?: Partial<SubscriptionTypes>;
    onSubmit: (formData: Partial<SubscriptionTypes>) => void;
    handleCancelClick: () => void;
    isLoading: boolean;
    isEditing?: boolean
}

export interface SubscriptionCardProps {
    label: string;
    price: number;
    currency: string;
    isSelected: boolean;
    onClick: () => void;
}