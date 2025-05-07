/**
 * Экспорт типов для платежей
 */
export type { PaymentTypes, PaymentStatusOption, PaymentMethodOption, PaymentStatus, PaymentMethod } from './types/Payment.types';
export type { WebPayResponse } from './types/WebPayResponse.types';
export type { CryptoPaymentDetails, CryptoPaymentRequest, CryptoPaymentResponse, CryptoPaymentStatus } from './types/CryptoPayment.types';

/**
 * Экспорт констант для статусов и методов оплаты
 */
export { PAYMENT_STATUS, PAYMENT_METHOD, PAYMENT_STATUS_OPTIONS, PAYMENT_METHOD_OPTIONS } from './constants';

/**
 * Экспорт моковых данных для тестирования
 */
export { mockWebPayResponse } from './mock/mockWebPayResponse';

/**
 * Экспорт конфигураций для различных типов платежей
 */
export { paymentConfig } from './config/paymentConfig';
export { paymentProcessConfig } from './config/paymentProcessConfig';
export { cryptoPaymentConfig } from './config/cryptoPaymentConfig';

/**
 * Экспорт настроек для криптоплатежей
 */
export { 
    CRYPTO_PAYMENT_SETTINGS, 
    SUPPORTED_CRYPTO_NETWORKS, 
    DEFAULT_CRYPTO_NETWORK 
} from './config/cryptoPaymentConfig';
