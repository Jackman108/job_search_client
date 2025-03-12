import {SubscriptionTypes} from "@entities/subscription";
import {PaymentTypes} from "@entities/payment";

export interface SubscriptionTableBodyProps {
    subscriptionData: SubscriptionTypes [];
    paymentData?: PaymentTypes[];
    subscribeEditClick: (id: string, item: SubscriptionTypes) => void;
    subscribeDelete: (id: string) => void;
    paymentEditClick?: (id: string, item: PaymentTypes) => void;
}

export interface SubscriptionFormProps {
    initialData?: Partial<SubscriptionTypes>;
    onSubmit: (formData: Partial<SubscriptionTypes>) => void;
    handleCancelClick: (id: string) => void;
    isLoading: boolean;
    isEditing?: boolean
}

export interface SubscriptionOptionProps {
    label: string;
    price: number;
    currency: string;
    isSelected: boolean;
    onClick: () => void;
}