import { useFetchByType, usePostByType } from "@api";
import { ACTION_TYPES } from '@config';
import { BasePayment, CryptoPaymentDetails, mockCryptoResponse, mockWebPayResponse, PAYMENT_METHOD, PAYMENT_STATUS, paymentConfig, paymentProcessConfig, UseProcessHandlerReturn, WebPayResponse } from "@entities/payment";
import { useCryptoPaymentHandler } from "./useCryptoPaymentHandler";
import { usePaymentStatusHandler } from "./usePaymentStatusHandler";

/**
 * Хук для обработки платежного процесса
 */
export const useProcessHandler = (): UseProcessHandlerReturn => {
    const {
        saveItem: processRequest,
        loading: loadingProcess,
        error: errorProcess,
    } = usePostByType(paymentProcessConfig);

    const { handleProcessSuccess, handleProcessFailure } = usePaymentStatusHandler();
    const { 
        handleCryptoPayment, 
        checkCryptoPaymentStatus,
        loadingCryptoProcess,
        errorCryptoProcess 
    } = useCryptoPaymentHandler();

    const { saveItem: updatePaymentStatus } = useFetchByType(paymentConfig);

    /**
     * Обрабатывает платежный процесс
     * В зависимости от метода оплаты (WebPay или Crypto) выполняет соответствующие действия
     * В dev режиме использует моковые данные, в prod - реальные запросы
     * 
     * @param paymentData - Данные платежа для обработки
     * @returns Promise с ответом от платежной системы
     * @throws Error если произошла ошибка при обработке платежа
     */
    const handleProcess = async (paymentData: BasePayment) => {
        if (!paymentData || !paymentData.id) {
            console.error('Payment data or payment ID is missing');
            return;
        }

        const paymentSystem = paymentData.payment_method as keyof typeof paymentProcessConfig;

        try {
            let response: WebPayResponse | CryptoPaymentDetails;
            
            if (process.env.NODE_ENV === 'development') {
                if (paymentSystem === PAYMENT_METHOD.CRYPTO) {
                    // В dev режиме используем моковые данные
                    response = {
                        ...mockCryptoResponse,
                        id: paymentData.id,
                        subscription_id: paymentData.subscription_id,
                        amount: paymentData.amount,
                        currency: paymentData.currency || 'BTC',
                        network: paymentData.network || 'BTC',
                        status: PAYMENT_STATUS.PENDING,
                        created_at: new Date(),
                        expires_at: new Date(Date.now() + 30 * 60 * 1000),
                        transaction_hash: null,
                        wallet_provider: 'mock'
                    };

                    // Обновляем статус в таблице payments
                    await updatePaymentStatus({
                        type: ACTION_TYPES.PAYMENT,
                        id: paymentData.id,
                        formData: {
                            payment_status: PAYMENT_STATUS.PENDING,
                            payment_method: paymentData.payment_method,
                            amount: paymentData.amount,
                            updated_at: new Date()
                        },
                        isEditing: true,
                    });

                    // Создаем или получаем существующую запись в crypto_payments
                    try {
                        await handleCryptoPayment(paymentData);
                    } catch (error: any) {
                        // Если ошибка о дублировании ключа, значит платеж уже существует
                        if (error?.message?.includes('duplicate key')) {
                            // Получаем существующий платеж
                            const existingPayment = await handleCryptoPayment(paymentData);
                            if (existingPayment) {
                                response = existingPayment;
                            }
                        } else {
                            throw error;
                        }
                    }
                    
                    return response;
                } else {
                    response = mockWebPayResponse;
                }
            } else {
                // В продакшене делаем реальный запрос
                response = await processRequest({
                    type: paymentSystem,
                    formData: {
                        id: paymentData.id,
                        subscription_id: paymentData.subscription_id,
                        amount: paymentData.amount,
                        currency: paymentData.currency || 'BTC',
                        network: paymentData.network,
                        payment_status: PAYMENT_STATUS.PENDING,
                    },
                    isEditing: false,
                }) as WebPayResponse | CryptoPaymentDetails;
            }

            if (paymentSystem === PAYMENT_METHOD.CRYPTO && 'crypto_address' in response) {
                const statusResponse = await checkCryptoPaymentStatus(
                    response.id,
                    response.status,
                    response.confirmations,
                    response.transaction_hash
                );

                if (statusResponse?.status === PAYMENT_STATUS.COMPLETED) {
                    await handleProcessSuccess(paymentData);
                }
            } else if ('page' in response && response.page === "success") {
                await handleProcessSuccess(paymentData);
            } else {
                await handleProcessFailure(paymentData);
            }

            return response;
        } catch (error) {
            await handleProcessFailure(paymentData);
            throw error;
        }
    };

    return {
        handleProcess,
        loadingProcess: loadingProcess || loadingCryptoProcess,
        errorProcess: errorProcess || errorCryptoProcess,
    };
};