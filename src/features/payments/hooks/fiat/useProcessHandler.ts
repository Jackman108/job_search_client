import { usePostByType } from "@api";
import { BasePayment, CryptoPaymentDetails, mockWebPayResponse, PAYMENT_METHOD, PAYMENT_STATUS, paymentProcessConfig, UseProcessHandlerReturn, WebPayResponse } from "@entities/payment";
import { useCryptoPaymentLogic } from '@features/payments/hooks';
import { usePaymentStatusHandler } from "@features/payments/hooks/base/usePaymentStatusHandler";
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

    const { handleProcessSuccess, handleProcessFailure, handleProcessExpired } = usePaymentStatusHandler();
    const {
        cryptoData: cryptoPayments,
        reloadCryptoPayments,
        cryptoFormSubmit: handleCryptoPayment,
        cryptoLoading: loadingCryptoProcess,
        cryptoError: errorCryptoProcess,
    } = useCryptoPaymentLogic();

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
                        (p: CryptoPaymentDetails) => p.id === paymentData.id && p.payment_status.toLowerCase() === PAYMENT_STATUS.PENDING
                    );
                    if (existingDev) {
                        // Если есть незавершенный, возвращаем без создания нового
                        return existingDev;
                    }
                    // Иначе собираем детали криптоплатежа через утилиту
                    response = buildCryptoDetails(paymentData as CryptoPaymentDetails);

                    // Перезагружаем список крипто-платежей и ищем существующий
                    await reloadCryptoPayments();
                    const existing = cryptoPayments?.find(
                        (p: CryptoPaymentDetails) => p.id === paymentData.id && p.payment_status.toLowerCase() === (PAYMENT_STATUS.PENDING || PAYMENT_STATUS.EXPIRED)
                    );
                    if (existing) {
                        // Если уже есть, возвращаем без нового POST
                        return existing;
                    }

                    // Создаём новый крипто-платёж через утилиту
                    try {
                        const payload = buildCryptoDetails(paymentData as CryptoPaymentDetails);
                        const created = await handleCryptoPayment(payload);
                        if (created) response = created;
                    } catch (error: any) {
                        if (error?.message?.includes('duplicate key')) {
                            // при дубликате перезагружаем и возвращаем существующий
                            await reloadCryptoPayments();
                            const existingAfter = cryptoPayments?.find(
                                (p: CryptoPaymentDetails) => p.id === paymentData.id && p.payment_status.toLowerCase() === PAYMENT_STATUS.PENDING
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
                        currency: paymentData.currency,
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
                // Статус базового платежа обновляется через usePaymentStatusHandler
                if (response.payment_status === PAYMENT_STATUS.COMPLETED) {
                    await handleProcessSuccess(response);
                } else if (response.payment_status === PAYMENT_STATUS.EXPIRED) {
                    await handleProcessExpired(response);
                } else {
                    await handleProcessFailure(response);
                }
            } else if ('page' in response && response.page === "success") {
                await handleProcessSuccess(response);
            } else {
                await handleProcessFailure(response);
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