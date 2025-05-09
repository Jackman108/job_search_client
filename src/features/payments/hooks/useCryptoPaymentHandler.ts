import { useFetchByType } from "@api";
import { BasePayment, CryptoPaymentDetails, PAYMENT_STATUS, UseCryptoPaymentHandlerReturn, cryptoPaymentConfig, mockCryptoResponse } from "@entities/payment";
import { getWalletUrl } from "@entities/payment/config/cryptoPaymentConfig";
import { ACTION_TYPES } from "@config";

/**
 * Хук для обработки криптоплатежей
 * Предоставляет функции для создания и проверки статуса криптоплатежей
 */
export const useCryptoPaymentHandler = (): UseCryptoPaymentHandlerReturn => {
    // один хук для createPayment, updateCrypto и checkStatus
    const {
        saveItem: mutateCrypto,
        loading: loadingCryptoProcess,
        error: errorCryptoProcess,
    } = useFetchByType(cryptoPaymentConfig);

    /**
     * Создает новый криптоплатеж
     * @param paymentData - Данные платежа
     * @returns Детали созданного криптоплатежа
     * @throws Error если отсутствуют обязательные данные
     */
    const handleCryptoPayment = async (paymentData: BasePayment): Promise<CryptoPaymentDetails> => {
        if (!paymentData.id || !paymentData.subscription_id) {
            throw new Error('Missing required payment data');
        }

        // Определяем адрес: переданный или моковый
        const address = paymentData.crypto_address || mockCryptoResponse.crypto_address;
        const network = paymentData.network || 'BTC';
        const response: CryptoPaymentDetails = {
            ...mockCryptoResponse,
            id: paymentData.id,
            subscription_id: paymentData.subscription_id,
            amount: paymentData.amount,
            currency: paymentData.currency || 'BTC',
            network,
            crypto_address: address,
            crypto_amount: String(paymentData.amount),
            status: PAYMENT_STATUS.PENDING,
            created_at: new Date(),
            expires_at: new Date(Date.now() + 30 * 60 * 1000),
            transaction_hash: null,
            wallet_provider: 'mock',
            payment_url: getWalletUrl(
                network,
                address,
                String(paymentData.amount)
            )
        };

        try {
            await mutateCrypto({
                type: 'createPayment',
                formData: {
                    id: paymentData.id,
                    subscription_id: paymentData.subscription_id,
                    amount: paymentData.amount,
                    currency: response.currency,
                    network: response.network,
                    crypto_address: response.crypto_address,
                    crypto_amount: response.crypto_amount,
                    status: response.status,
                    created_at: response.created_at,
                    expires_at: response.expires_at,
                    transaction_hash: response.transaction_hash,
                    wallet_provider: response.wallet_provider
                },
                isEditing: false,
            });
        } catch (error: any) {
            if (error?.message?.includes('duplicate key')) {
                const existingPayment = await mutateCrypto({
                    type: 'getExistingPayment',
                    formData: {
                        paymentId: paymentData.id
                    },
                    isEditing: false,
                });
                if (existingPayment) {
                    return existingPayment;
                }
            }
            throw error;
        }

        return response;
    };

    /**
     * Обновляет опции криптоплатежа и возвращает новые детали
     */
    const updateCryptoOptions = async (opts: { paymentId: string; network?: string; crypto_address?: string; crypto_amount?: string }) => {
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
            type: 'checkStatus',
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