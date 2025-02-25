export interface Payment {
    id?: number;
    userId: string;
    amount: number;
    paymentStatus: string;
    paymentMethod?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaymentTableBodyProps {
    paymentData: Payment[];
    handleEditClick: (type: string, item: Payment) => void;
    handleDelete: (id: string | number) => void;
}

export interface PaymentFormProps {
    initialData?: Partial<Payment>;
    onSubmit: (formData: Partial<Payment>) => void;
    handleCancelClick: () => void;
    isLoading: boolean;
}