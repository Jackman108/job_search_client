export interface SubscriptionItem {
    id: string;
    userId: string;
    subscriptionType: string;
    price: number;
    startDate: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
}