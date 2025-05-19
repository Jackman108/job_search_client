import { useCallback, useState } from 'react';
import { useTableLogic, useEntityFetch } from '@hooks';
import { ACTION_TYPES } from '@config';
import { BasePayment, paymentConfig, PAYMENT_METHOD, PAYMENT_STATUS } from '@entities/payment';
import { CryptoPaymentDetails } from '@entities/payment/types/crypto.types';
import { useProcessHandler } from '@features/payments/hooks';

/**
 * Полный хук логики платежей: CRUD + обработка платежей + криптоплатежи
 */
export const usePaymentLogic = () => {
    const [cryptoPaymentDetails, setCryptoPaymentDetails] = useState<CryptoPaymentDetails | null>(null);
    const [showCryptoPayment, setShowCryptoPayment] = useState(false);

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

    const { handleProcess, loadingProcess, errorProcess } = useProcessHandler();

    /** Обрабатывает платеж с учётом метода (WebPay/ERIP или Crypto) */
    const paymentWithProcess = useCallback(async (formData: Partial<BasePayment>) => {
        // если есть активный незавершенный криптоплатёж
        if (cryptoPaymentDetails?.payment_status?.toLowerCase() === PAYMENT_STATUS.PENDING) {
            setShowCryptoPayment(true);
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
            // криптоплатёж
            if (updated.payment_method === PAYMENT_METHOD.CRYPTO) {
                try {
                    const response = await handleProcess(updated);
                    if (response && 'crypto_address' in response) {
                        setCryptoPaymentDetails(response);
                        setShowCryptoPayment(true);
                        paymentToggleForm();
                    }
                } catch (e: any) {
                    if (e.message.includes('duplicate key')) {
                        const existing = await handleProcess({ ...updated });
                        if (existing && 'crypto_address' in existing) {
                            setCryptoPaymentDetails(existing);
                            setShowCryptoPayment(true);
                            paymentToggleForm();
                        }
                    } else {
                        throw e;
                    }
                }
            } else {
                // фиатный платёж
                await handleProcess(updated);
                paymentToggleForm();
            }
        } catch (e) {
            console.error('Error processing payment:', e);
        }
    }, [cryptoPaymentDetails, handleProcess, paymentData, paymentToggleForm]);

    const paymentEditClick = useCallback((type: string, item: any) => {
        paymentEdit(type, item);
        paymentToggleForm();
    }, [paymentToggleForm, paymentEdit]);

    /** Закрывает окно криптоплатежа */
    const handleCloseCryptoPayment = useCallback(() => {
        setShowCryptoPayment(false);
        setCryptoPaymentDetails(null);
    }, []);

    /** Обновляет детали криптоплатежа и перезагружает список */
    const updateCryptoPaymentDetails = useCallback((details: CryptoPaymentDetails) => {
        setCryptoPaymentDetails(details);
        loadPayments();
    }, [loadPayments]);

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
        // процессинг
        paymentSubmit: paymentWithProcess,
        loadingProcess,
        errorProcess,
        // криптоплатежи
        cryptoPaymentDetails,
        showCryptoPayment,
        handleCloseCryptoPayment,
        updateCryptoPaymentDetails,
    };
}; 