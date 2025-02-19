export interface Payment {
    id: number;
    userId: string;
    amount: number;
    paymentStatus: string;
    paymentMethod?: string;
    createdAt: string;
    updatedAt: string;
}