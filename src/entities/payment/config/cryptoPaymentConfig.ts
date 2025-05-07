import { ConfigItem } from "@type";

/**
 * Конфигурация для работы с криптоплатежами
 * Содержит настройки API эндпоинтов и полей для различных операций
 */
export const cryptoPaymentConfig: Record<string, ConfigItem> = {
    checkStatus: {
        title: 'Check Crypto Payment Status',
        apiEndpoint: '/payment/crypto/status',
        fields: {
            paymentId: 'Payment ID',
            status: 'Status',
            confirmations: 'Confirmations',
            transactionHash: 'Transaction Hash'
        }
    },
    createPayment: {
        title: 'Create Crypto Payment',
        apiEndpoint: '/payment/crypto',
        fields: {
            id: 'ID',
            subscription_id: 'Subscription ID',
            amount: 'Amount',
            currency: 'Currency',
            network: 'Network'
        }
    },
    getExchangeRate: {
        title: 'Get Crypto Exchange Rate',
        apiEndpoint: '/payment/crypto/exchange-rate',
        fields: {
            from: 'From Currency',
            to: 'To Currency'
        }
    },
    validateAddress: {
        title: 'Validate Crypto Address',
        apiEndpoint: '/payment/crypto/validate-address',
        fields: {
            address: 'Address',
            network: 'Network'
        }
    }
};

/**
 * Список поддерживаемых криптовалютных сетей
 * Каждая сеть представлена объектом с value (код валюты) и label (название)
 */
export const SUPPORTED_CRYPTO_NETWORKS = [
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' },
    { value: 'USDT', label: 'Tether (USDT)' },
    { value: 'BCH', label: 'Bitcoin Cash' },
    { value: 'LTC', label: 'Litecoin' }
] as const;

/**
 * Сеть по умолчанию для криптоплатежей
 */
export const DEFAULT_CRYPTO_NETWORK = 'BTC';

/**
 * Настройки для криптоплатежей
 * Включает время истечения платежа, минимальное количество подтверждений для разных сетей,
 * интервал обновления статуса и максимальное количество попыток
 */
export const CRYPTO_PAYMENT_SETTINGS = {
    defaultExpirationTime: 30 * 60 * 1000, // 30 minutes in milliseconds
    minConfirmations: {
        BTC: 3,
        ETH: 12,
        USDT: 12,
        BCH: 3,
        LTC: 3
    },
    refreshInterval: 10000, // 10 seconds
    maxRetries: 3
} as const; 