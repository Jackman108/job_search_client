import { PAYMENT_STATUS, PaymentTypes } from "@entities/payment";
import { useFetchByType } from "@api";
import { ACTION_TYPES } from '@config';
import { paymentConfig } from "@entities/payment";

/**
 * Хук для обработки статусов платежей
 * Предоставляет функции для обновления статуса платежа при успешном или неуспешном завершении
 */
export const usePaymentStatusHandler = () => {
    const { saveItem: updatePaymentStatus } = useFetchByType(paymentConfig);

    /**
     * Обрабатывает успешное завершение платежа
     * Обновляет статус платежа на "completed" и сохраняет информацию о методе оплаты и сумме
     * @param paymentData - Данные платежа для обновления
     */
    const handleProcessSuccess = async (paymentData: PaymentTypes) => {
        try {
            await updatePaymentStatus({
                type: ACTION_TYPES.PAYMENT,
                id: paymentData.id,
                formData: {
                    payment_status: PAYMENT_STATUS.COMPLETED,
                    payment_method: paymentData.payment_method,
                    amount: paymentData.amount,
                    updated_at: new Date()
                },
                isEditing: true,
            });
        } catch (error) {
            console.error('Failed to update payment status to "completed":', error);
        }
    };

    /**
     * Обрабатывает неуспешное завершение платежа
     * Обновляет статус платежа на "failed" и сохраняет информацию о методе оплаты и сумме
     * @param paymentData - Данные платежа для обновления
     */
    const handleProcessFailure = async (paymentData: PaymentTypes) => {
        try {
            await updatePaymentStatus({
                type: ACTION_TYPES.PAYMENT,
                id: paymentData.id,
                formData: {
                    payment_status: PAYMENT_STATUS.FAILED,
                    payment_method: paymentData.payment_method,
                    amount: paymentData.amount,
                },
                isEditing: true,
            });
        } catch (error) {
            console.error('Failed to update payment status to "failed":', error);
        }
    };

    return {
        handleProcessSuccess,
        handleProcessFailure
    };
}; 