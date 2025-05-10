import { useFetchByType } from "@api";
import { BasePayment, CryptoPaymentDetails, UseCryptoPaymentHandlerReturn, cryptoPaymentConfig } from "@entities/payment";
import { buildCryptoDetails } from "../utils/buildCryptoDetails";
import { ACTION_TYPES } from "@config";

/**
 * Хук для обработки криптоплатежей.
 * Предоставляет функции для создания, проверки и обновления статуса платежа.
 * Узкие места:
 * - Дублирование запросов может выбросить исключение duplicate key.
 * - mutateCrypto универсальный, внимательно с ключами типов (type).
 * - Ошибки логируются в консоль для последующего сбора.
 */
export const useCryptoPaymentHandler = (): UseCryptoPaymentHandlerReturn => {
    // один хук для createPayment, updateCrypto и checkStatus
    const {
        saveItem: mutateCrypto,
        loading: loadingCryptoProcess,
        error: errorCryptoProcess,
    } = useFetchByType(cryptoPaymentConfig);
    // useFetchByType строит методы CRUD по cryptoPaymentConfig и кеширует данные

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

        try {
            // Отправляем данные на сервер для создания записи
            await mutateCrypto({
                type: 'createPayment',
                formData: {
                    id: details.id,
                    subscription_id: details.subscription_id,
                    amount: details.amount,
                    currency: details.currency,
                    network: details.network,
                    crypto_address: details.crypto_address,
                    crypto_amount: details.crypto_amount,
                    status: details.status,
                    created_at: details.created_at,
                    expires_at: details.expires_at,
                    transaction_hash: details.transaction_hash,
                    wallet_provider: details.wallet_provider
                },
                isEditing: false,
            });
        } catch (error: any) {
            // Логируем основную ошибку создания, включая возможные network/validation ошибки
            console.error('Error creating crypto payment:', error);
            if (error?.message?.includes('duplicate key')) {
                // Обработка ситуации, когда платеж с таким ID уже существует в базе
                try {
                    const existingPayment = await mutateCrypto({
                        type: 'getExistingPayment',
                        formData: { paymentId: paymentData.id },
                        isEditing: false,
                    });
                    if (existingPayment) {
                        return existingPayment;
                    }
                } catch (innerError) {
                    // Ошибка при получении существующего платежа, возможно проблемы с конфигом type
                    console.error('Error fetching existing payment:', innerError);
                    throw innerError;
                }
            }
            throw error;
        }

        // Возвращаем детали (успешно собранные или полученные из существующей записи)
        return details;
    };

    /**
     * Обновляет опции криптоплатежа и возвращает новые детали
     */
    const updateCryptoOptions = async (opts: { paymentId: string; network?: string; crypto_address?: string; crypto_amount?: string }) => {
        // Подготовка параметров для API, внимательнее с именами полей
        const { paymentId, network, crypto_address, crypto_amount } = opts;
        return await mutateCrypto({
            type: ACTION_TYPES.CRYPTO_PAYMENT,
            id: paymentId,
            formData: { network, crypto_address, crypto_amount },
            isEditing: true,
        });
    };

    /**
     * Проверяет статус криптоплатежа
     * @param paymentId - ID платежа
     * @param status - Текущий статус
     * @param confirmations - Количество подтверждений
     * @param transactionHash - Хеш транзакции
     * @returns Обновленный статус платежа
     */
    const checkCryptoPaymentStatus = (paymentId: string, status: string, confirmations?: number, transactionHash?: string | null) =>
        mutateCrypto({
            type: ACTION_TYPES.CRYPTO_STATUS,
            formData: { paymentId, status, confirmations, transactionHash: transactionHash || undefined },
            isEditing: false,
        });

    return {
        handleCryptoPayment,
        checkCryptoPaymentStatus,
        updateCryptoOptions,
        loadingCryptoProcess,
        errorCryptoProcess
    };
}; 