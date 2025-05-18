import { usePostByType } from "@api";
import { ACTION_TYPES } from '@config';
import { BasePayment, CryptoPaymentDetails, mockWebPayResponse, PAYMENT_METHOD, PAYMENT_STATUS, paymentConfig, paymentProcessConfig, UseProcessHandlerReturn, WebPayResponse } from "@entities/payment";
import { usePaymentStatusHandler } from "@features/payments/hooks/base/usePaymentStatusHandler";
import { useEntityFetch } from '@hooks';
import { useCryptoPaymentLogic } from '@features/payments/hooks';
import { buildCryptoDetails } from '@features/payments/utils/buildCryptoDetails';

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
        cryptoData: cryptoPayments,
        reloadCryptoPayments,
        cryptoFormSubmit: handleCryptoPayment,
        cryptoLoading: loadingCryptoProcess,
        cryptoError: errorCryptoProcess,
    } = useCryptoPaymentLogic();

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
                    // В dev режиме сначала проверяем существующие незавершенные криптоплатежи
                    await reloadCryptoPayments();
                    const existingDev = cryptoPayments?.find(
                        (p: CryptoPaymentDetails) => p.id === paymentData.id && p.status.toLowerCase() === PAYMENT_STATUS.PENDING
                    );
                    if (existingDev) {
                        // Если есть незавершенный, возвращаем без создания нового
                        return existingDev;
                    }
                    // Иначе собираем детали криптоплатежа через утилиту
                    response = buildCryptoDetails(paymentData);

                    // Обновляем статус в таблице payments
                    await updatePaymentStatus({
                        type: ACTION_TYPES.PAYMENT,
                        id: response.id,
                        formData: {
                            payment_status: response.payment_status,
                            payment_method: response.payment_method,
                            amount: response.amount,
                            updated_at: response.created_at
                        },
                        isEditing: true,
                    });

                    // Перезагружаем список крипто-платежей и ищем существующий
                    await reloadCryptoPayments();
                    const existing = cryptoPayments?.find(
                        (p: CryptoPaymentDetails) => p.id === paymentData.id && p.status.toLowerCase() === PAYMENT_STATUS.PENDING
                    );
                    if (existing) {
                        // Если уже есть, возвращаем без нового POST
                        return existing;
                    }

                    // Создаём новый крипто-платёж через утилиту
                    try {
                        const payload = buildCryptoDetails(paymentData);
                        const created = await handleCryptoPayment(payload);
                        if (created) response = created;
                    } catch (error: any) {
                        if (error?.message?.includes('duplicate key')) {
                            // при дубликате перезагружаем и возвращаем существующий
                            await reloadCryptoPayments();
                            const existingAfter = cryptoPayments?.find(
                                (p: CryptoPaymentDetails) => p.id === paymentData.id && p.status.toLowerCase() === PAYMENT_STATUS.PENDING
                            );
                            if (existingAfter) {
                                return existingAfter;
                            }
                        }
                        throw error;
                    }

                    return response;
                } else {
                    // В dev режиме возвращаем моковый WebPay ответ
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
                // В продакшене для криптоплатежей сохраняем в БД через общий хук
                if (paymentSystem === PAYMENT_METHOD.CRYPTO && 'crypto_address' in response) {
                    try {
                        await handleCryptoPayment(response as CryptoPaymentDetails);
                        await reloadCryptoPayments();
                    } catch (err) {
                        console.error('Error saving crypto payment in prod:', err);
                    }
                }
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