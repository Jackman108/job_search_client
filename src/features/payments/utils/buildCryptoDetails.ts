import { CryptoPaymentDetails, mockCryptoResponse } from '@entities/payment';
import { CRYPTO_PAYMENT_SETTINGS, DEFAULT_CRYPTO_NETWORK, getWalletUrl } from '@entities/payment/config/cryptoPaymentConfig';

/**
 * Утилита для сборки объекта деталей криптоплатежа.
 * Важное:
 * - В продакшн-режиме без указания crypto_address выбрасывается ошибка.
 * - Mock-данные используется только при development (process.env.NODE_ENV).
 * - Время жизни платежа берется из константы CRYPTO_PAYMENT_SETTINGS.defaultExpirationTime.
 * Узкие места:
 * - Необходимо удостовериться, что paymentData содержит обязательные поля.
 * - При изменении формата mockCryptoResponse нужно синхронизировать интерфейс.
 */
export function buildCryptoDetails(paymentData: CryptoPaymentDetails): CryptoPaymentDetails {
    const now = Date.now();
    // Если сеть не указана, используем сеть по умолчанию из констант
    const network = paymentData.network ?? DEFAULT_CRYPTO_NETWORK;
    // В Prod: без crypto_address будет undefined и далее выбросится ошибка
    // В Dev: подставляем mock-адрес, чтобы не ломались запросы
    const cryptoAddress = paymentData.crypto_address ?? (process.env.NODE_ENV === 'development' ? mockCryptoResponse.crypto_address : undefined);
    if (!cryptoAddress) {
        // Без адреса криптокошелька дальнейшая обработка невозможна
        throw new Error('Crypto address is required for payment.');
    }

    const amount = paymentData.amount;
    // Время создания платежа
    const createdAt = new Date(now);
    // Рассчитываем время истечения на основе константы (по умолчанию 30 минут)
    const expiresAt = new Date(now + CRYPTO_PAYMENT_SETTINGS.defaultExpirationTime);

    return {
        // Формируем объект ответа согласно интерфейсу CryptoPaymentDetails
        id: paymentData.id,
        subscription_id: paymentData.subscription_id,
        amount,
        payment_status: paymentData.payment_status,
        currency: paymentData.currency ?? network,
        network,
        crypto_address: cryptoAddress,
        crypto_amount: amount.toString(),
        created_at: createdAt,
        expires_at: expiresAt,
        transaction_hash: null,
        // Провайдер: mock в development, иначе 'default'
        wallet_provider: process.env.NODE_ENV === 'development' ? mockCryptoResponse.wallet_provider : 'default',
        payment_url: getWalletUrl(network, cryptoAddress, amount.toString()),
    };
} 