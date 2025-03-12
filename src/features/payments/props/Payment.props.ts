import {PaymentTypes} from "@entities/payment";

export interface PaymentTableBodyProps {
    paymentData: PaymentTypes[];
    handleEditClick: (type: string, item: PaymentTypes) => void;
    handleDelete: (id: string) => void;
}

export interface PaymentFormProps {
    initialData?: Partial<PaymentTypes>;
    onSubmit: (formData: Partial<PaymentTypes>) => void;
    handleCancelClick: (id: string) => void;
    isLoading: boolean;
}