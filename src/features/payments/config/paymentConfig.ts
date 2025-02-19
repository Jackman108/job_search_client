import {ConfigItem} from "../../resume/types/InterfaceResume.types";

export const paymentConfig: Record<string, ConfigItem> = {
    payment: {
        title: 'Платежи',
        apiEndpoint: '/payment',
        fields: {
            id: 'ID',
            userId: 'User ID',
            amount: 'Amount',
            paymentStatus: 'Payment Status',
            paymentMethod: 'Payment Method',
            createdAt: 'Created At',
            updatedAt: 'Updated At'
        },
    },
};
