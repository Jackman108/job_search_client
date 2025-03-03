export interface Payment {
    id?: string;
    user_id: string;
    amount: number;
    payment_status: string;
    payment_method?: string;
    created_at?: string;
    updated_at?: string;
}

export interface PaymentTableBodyProps {
    paymentData: Payment[];
    handleEditClick: (type: string, item: Payment) => void;
    handleDelete: (id: string) => void;
}

export interface PaymentFormProps {
    initialData?: Partial<Payment>;
    onSubmit: (formData: Partial<Payment>) => void;
    handleCancelClick: () => void;
    isLoading: boolean;
}