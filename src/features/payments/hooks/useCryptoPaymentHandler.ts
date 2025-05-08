import { usePostByType } from "@api";
import { BasePayment, CryptoPaymentDetails, PAYMENT_STATUS, UseCryptoPaymentHandlerReturn, cryptoPaymentConfig, mockCryptoResponse } from "@entities/payment";

/**
 * Хук для обработки криптоплатежей
 * Предоставляет функции для создания и проверки статуса криптоплатежей
 */
export const useCryptoPaymentHandler = (): UseCryptoPaymentHandlerReturn => {
    const {
        saveItem: cryptoProcessRequest,
        loading: loadingCryptoProcess,
        error: errorCryptoProcess,
    } = usePostByType(cryptoPaymentConfig);

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

        const response: CryptoPaymentDetails = {
            ...mockCryptoResponse,
            id: paymentData.id,
            subscription_id: paymentData.subscription_id,
            amount: paymentData.amount,
            currency: paymentData.currency || 'BTC',
            network: paymentData.network || 'BTC',
            crypto_address: mockCryptoResponse.crypto_address,
            crypto_amount: String(paymentData.amount),
            status: PAYMENT_STATUS.PENDING,
            created_at: new Date(),
            expires_at: new Date(Date.now() + 30 * 60 * 1000),
            transaction_hash: null,
            wallet_provider: 'mock',
            payment_url: generatePaymentUrl(
                paymentData.network || 'BTC',
                mockCryptoResponse.crypto_address,
                String(paymentData.amount)
            )
        };

        try {
            await cryptoProcessRequest({
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
                const existingPayment = await cryptoProcessRequest({
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
     * Проверяет статус криптоплатежа
     * @param paymentId - ID платежа
     * @param status - Текущий статус
     * @param confirmations - Количество подтверждений
     * @param transactionHash - Хеш транзакции
     * @returns Обновленный статус платежа
     */
    const checkCryptoPaymentStatus = async (paymentId: string, status: string, confirmations?: number, transactionHash?: string | null) => {
        return await cryptoProcessRequest({
            type: 'checkStatus',
            formData: {
                paymentId,
                status,
                confirmations,
                transactionHash: transactionHash || undefined
            },
            isEditing: false,
        });
    };

    /**
     * Генерирует URL для оплаты в зависимости от сети
     */
    const generatePaymentUrl = (network: string, address: string, amount: string): string => {
        switch (network.toUpperCase()) {
            case 'BTC':
                return `bitcoin:${address}?amount=${amount}`;
            case 'ETH':
                return `ethereum:${address}?value=${amount}`;
            case 'USDT':
                return `ethereum:${address}?value=${amount}&token=USDT`;
            case 'BCH':
                return `bitcoincash:${address}?amount=${amount}`;
            case 'LTC':
                return `litecoin:${address}?amount=${amount}`;
            default:
                return `bitcoin:${address}?amount=${amount}`;
        }
    };

    return {
        handleCryptoPayment,
        checkCryptoPaymentStatus,
        loadingCryptoProcess,
        errorCryptoProcess
    };
}; 