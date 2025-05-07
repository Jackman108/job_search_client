/**
 * Интерфейс для деталей криптоплатежа
 */
export interface CryptoPaymentDetails {
    /** Уникальный идентификатор платежа */
    id: string;
    /** ID подписки, для которой создан платеж */
    subscription_id: string;
    /** Сумма платежа в фиатной валюте */
    amount: string;
    /** Валюта платежа (например, USD, EUR) */
    currency: string;
    /** Криптовалютная сеть (например, BTC, ETH) */
    network: string;
    /** Адрес для получения криптовалюты */
    crypto_address: string;
    /** Сумма в криптовалюте */
    crypto_amount: string;
    /** Статус платежа */
    status: string;
    /** Дата создания платежа */
    created_at: Date;
    /** Дата истечения платежа */
    expires_at: Date;
    /** Хеш транзакции в блокчейне */
    transaction_hash: string | null;
    /** Провайдер кошелька */
    wallet_provider: string;
    /** Количество подтверждений транзакции */
    confirmations?: number;
    /** URL для оплаты через кошелек */
    payment_url?: string;
}

/**
 * Интерфейс для запроса создания криптоплатежа
 */
export interface CryptoPaymentRequest {
    /** ID подписки */
    subscription_id: string;
    /** Сумма платежа */
    amount: number;
    /** Валюта платежа */
    currency: string;
    /** Криптовалютная сеть (опционально) */
    network?: string;
}

/**
 * Интерфейс для ответа на запрос создания криптоплатежа
 */
export interface CryptoPaymentResponse {
    /** Успешность операции */
    success: boolean;
    /** Детали платежа */
    details: CryptoPaymentDetails;
    /** Сообщение об ошибке (если есть) */
    error?: string;
}

/**
 * Интерфейс для статуса криптоплатежа
 */
export interface CryptoPaymentStatus {
    /** Статус платежа */
    status: string;
    /** Количество подтверждений транзакции */
    confirmations?: number;
    /** Хеш транзакции */
    transactionHash?: string;
    /** Сообщение об ошибке (если есть) */
    error?: string;
} 