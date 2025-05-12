import { BasePayment, CryptoPaymentDetails, UseCryptoPaymentHandlerReturn } from "@entities/payment";
import { buildCryptoDetails } from "../utils/buildCryptoDetails";
import { useEntityPost } from '@api';
import { cryptoPaymentConfig, CryptoPaymentAction } from '@entities/payment/config/cryptoPaymentConfig';
/**
 * Хук для обработки криптоплатежей.
 * Предоставляет функции для создания, проверки и обновления статуса платежа.
 * Узкие места:
 * - Дублирование запросов может выбросить исключение duplicate key.
 * - mutateCrypto универсальный, внимательно с ключами типов (type).
 * - Ошибки логируются в консоль для последующего сбора.
 */
export const useCryptoPaymentHandler = (): UseCryptoPaymentHandlerReturn => {
    const { post, loading: loadingCryptoProcess, error: errorCryptoProcess } = useEntityPost(cryptoPaymentConfig);

    // константы операций из конфигурации
    const CREATE_PAYMENT: CryptoPaymentAction = 'createPayment';
    const CHECK_STATUS: CryptoPaymentAction = 'checkCryptoStatus';
    const UPDATE_PAYMENT: CryptoPaymentAction = 'updateCryptoPayment';

    /**
     * Создает новый криптоплатеж
     * @param paymentData - Данные платежа
     * @returns Детали созданного криптоплатежа
     * @throws Error если отсутствуют обязательные данные или адрес
     */
    const handleCryptoPayment = async (paymentData: BasePayment): Promise<CryptoPaymentDetails> => {
        // Проверяем обязательные поля перед созданием
        if (!paymentData.id || !paymentData.subscription_id) {
            throw new Error('Missing required payment data');
        }

        // Собираем детали платежа (может бросить ошибку при отсутствии crypto_address)
        const details = buildCryptoDetails(paymentData);

        // Идемпотентный вызов: post вернёт новую или существующую запись
        const response = await post(CREATE_PAYMENT, {
            formData: {
                id: details.id,
                subscription_id: details.subscription_id,
                amount: details.amount,
                currency: details.currency,
                network: details.network
            }, isEditing: false
        });
        // Возвращаем данные от сервера
        return response.data ?? response;
    };

    /**
     * Обновляет опции криптоплатежа и возвращает новые детали
     */
    const updateCryptoOptions = async (opts: { paymentId: string; network?: string; crypto_address?: string; crypto_amount?: string }) => {
        // Подготовка параметров для API, внимательнее с именами полей
        const { paymentId, network, crypto_address, crypto_amount } = opts;
        return await post(UPDATE_PAYMENT, { id: paymentId, formData: { network, crypto_address, crypto_amount }, isEditing: true });
    };

    /**
     * Проверяет статус криптоплатежа
     * @param paymentId - ID платежа
     * @param status - Текущий статус
     * @param confirmations - Количество подтверждений
     * @param transactionHash - Хеш транзакции
     * @returns Обновленный статус платежа
     */
    const checkCryptoPaymentStatus = async (paymentId: string, status: string, confirmations?: number, transactionHash?: string | null) => {
        return await post(CHECK_STATUS, { id: paymentId, formData: { status, confirmations, transactionHash: transactionHash || undefined }, isEditing: false });
    };

    return {
        handleCryptoPayment,
        checkCryptoPaymentStatus,
        updateCryptoOptions,
        loadingCryptoProcess,
        errorCryptoProcess
    };
}; 