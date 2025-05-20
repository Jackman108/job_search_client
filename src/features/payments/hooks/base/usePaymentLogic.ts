import { ACTION_TYPES } from '@config';
import { BasePayment, PAYMENT_METHOD, PAYMENT_STATUS, paymentConfig } from '@entities/payment';
import { useProcessHandler } from '@features/payments/hooks';
import { useCryptoPaymentLogic } from '@features/payments/hooks/crypto/useCryptoPaymentLogic';
import { useEntityFetch, useTableLogic } from '@hooks';
import { useCallback } from 'react';
/**
 * Полный хук логики платежей: CRUD + обработка платежей + криптоплатежи
 */
export const usePaymentLogic = () => {
    const {
        cryptoToggleForm,
        cryptoPaymentDetails,
        setCryptoPaymentDetails,
        cryptoCancel,
        updateCryptoPaymentDetails,
        cryptoShowForm,
    } = useCryptoPaymentLogic();

    const {
        data: paymentData,
        loading: paymentLoading,
        error: paymentError,
        formData: paymentFormData,
        isEditing: paymentsIsEditing,
        showForm: paymentShowForm,
        handleEditClick: paymentEdit,
        handleDelete: paymentDelete,
        handleFormSubmit: createPayment,
        handleToggleForm: paymentToggleForm,
        handleCancelAction: paymentCancel,
        loadData: loadPayments,
    } = useTableLogic<BasePayment>(paymentConfig, useEntityFetch, ACTION_TYPES.PAYMENT);

    const {
        handleProcess,
        loadingProcess,
        errorProcess,
    } = useProcessHandler();

    /** Обрабатывает платеж с учётом метода (WebPay/ERIP или Crypto) */
    const paymentWithProcess = useCallback(async (formData: Partial<BasePayment>) => {
        // если есть активный незавершенный криптоплатёж
        if (cryptoPaymentDetails?.payment_status?.toLowerCase() === PAYMENT_STATUS.PENDING) {
            cryptoToggleForm();
            paymentToggleForm();
            return;
        }
        try {
            const latest = paymentData?.find((p: BasePayment) => p.payment_status === PAYMENT_STATUS.PENDING);
            if (!latest) {
                console.error('No pending payment found');
                return;
            }
            const updated: BasePayment = {
                ...latest,
                payment_method: formData.payment_method,
                amount: formData.amount ?? latest.amount,
            };
            // криптоплатёж: обрабатываем, затем открываем форму с деталями
            if (updated.payment_method === PAYMENT_METHOD.CRYPTO) {
                try {
                    const response = await handleProcess(updated);
                    if (response && 'crypto_address' in response) {

                        setCryptoPaymentDetails(response);
                        cryptoToggleForm();
                        paymentToggleForm();
                    }
                } catch (e: any) {
                    if (e.message.includes('duplicate key')) {
                        const existing = await handleProcess({ ...updated });
                        if (existing && 'crypto_address' in existing) {
                            setCryptoPaymentDetails(existing);
                            cryptoToggleForm();
                            paymentToggleForm();
                        }
                    } else {
                        throw e;
                    }
                }
                return;
            }
            // фиатный платёж
            await handleProcess(updated);
            paymentToggleForm();
        } catch (e) {
            console.error('Error processing payment:', e);
        }
    }, [cryptoPaymentDetails, handleProcess, paymentData, paymentToggleForm, cryptoToggleForm, setCryptoPaymentDetails]);

    const paymentEditClick = useCallback((type: string, item: any) => {
        paymentEdit(type, item);
        paymentToggleForm();
    }, [paymentToggleForm, paymentEdit]);

    return {
        // CRUD
        paymentData,
        paymentLoading,
        paymentError,
        paymentFormData,
        paymentsIsEditing,
        paymentShowForm,
        paymentEditClick,
        createPayment,
        paymentDelete,
        paymentToggleForm,
        paymentCancel,
        loadPayments,
        paymentSubmit: paymentWithProcess,
        // Crypto payment UI controls
        cryptoShowForm,
        cryptoPaymentDetails,
        cryptoCancel,
        updateCryptoPaymentDetails,
        // Process loading/error state
        loadingProcess,
        errorProcess,
    };
}; 