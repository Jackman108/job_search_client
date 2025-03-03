export interface SubscriptionItem {
    id?: string;
    user_id: string;
    subscription_type: string;
    price: number;
    start_date: string;
    end_date: string;
    created_at?: string;
    updated_at?: string;
}

export interface SubscriptionTableBodyProps {
    subscriptionData: SubscriptionItem[];
    handleEditClick: (type: string, item: SubscriptionItem) => void;
    handleDelete: (id: string) => void;
}

export interface SubscriptionFormProps {
    initialData?: Partial<SubscriptionItem>;
    onSubmit: (formData: Partial<SubscriptionItem>) => void;
    handleCancelClick: () => void;
    isLoading: boolean;
}