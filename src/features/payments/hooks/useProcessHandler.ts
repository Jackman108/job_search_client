import { usePostByType } from "@api";
import { ACTION_TYPES } from '@config';
import { BasePayment, CryptoPaymentDetails, mockCryptoResponse, mockWebPayResponse, PAYMENT_METHOD, PAYMENT_STATUS, paymentConfig, paymentProcessConfig, UseProcessHandlerReturn, WebPayResponse } from "@entities/payment";
import { usePaymentStatusHandler } from "./usePaymentStatusHandler";
import { useEntityFetch, useTableLogic } from '@hooks';
import { cryptoPaymentConfig } from "@entities/payment/config/cryptoPaymentConfig";

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
        data: cryptoPayments,
        loadData: reloadCryptoPayments,
        handleFormSubmit: handleCryptoPayment,
        loading: loadingCryptoProcess,
        error: errorCryptoProcess
    } = useTableLogic<CryptoPaymentDetails>(
        cryptoPaymentConfig,
        useEntityFetch,
        ACTION_TYPES.CRYPTO
    );

    const { saveItem: updatePaymentStatus } = useEntityFetch<BasePayment>(paymentConfig);

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
                        crypto_address: paymentData.crypto_address ?? mockCryptoResponse.crypto_address,
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

                    // Проверяем наличие незавершенного крипто-платежа
                    const existing = cryptoPayments?.find(
                        (p: CryptoPaymentDetails) => p.id === paymentData.id && p.status.toLowerCase() === PAYMENT_STATUS.PENDING
                    );
                    if (existing) {
                        response = existing;
                    } else {
                        // Создаем новый крипто-платеж
                        try {
                            const created = await handleCryptoPayment(paymentData);
                            response = created || response;
                        } catch (error: any) {
                            // Если дубликат, получаем существующий
                            if (error?.message?.includes('duplicate key')) {
                                const existing2 = await handleCryptoPayment(paymentData);
                                if (existing2) response = existing2;
                            } else {
                                throw error;
                            }
                        }
                    }
                    // Перезагружаем список крипто-платежей
                    await reloadCryptoPayments();

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

                // Обновляем статус в таблице payments
                await updatePaymentStatus({
                    type: ACTION_TYPES.PAYMENT,
                    id: response.id,
                    formData: {
                        payment_status: response.status,
                        payment_method: paymentData.payment_method,
                        amount: response.amount,
                        updated_at: new Date()
                    },
                    isEditing: true,
                });
                if (response?.status === PAYMENT_STATUS.COMPLETED) {
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