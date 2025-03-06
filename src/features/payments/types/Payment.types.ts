export interface PaymentItem {
    id?: string;
    subscription_id: string;
    amount: number;
    payment_status: string;
    payment_method?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface PaymentTableBodyProps {
    paymentData: PaymentItem[];
    handleEditClick: (type: string, item: PaymentItem) => void;
    handleDelete: (id: string) => void;
}

export interface PaymentFormProps {
    initialData?: Partial<PaymentItem>;
    onSubmit: (formData: Partial<PaymentItem>) => void;
    handleCancelClick: () => void;
    isLoading: boolean;
}