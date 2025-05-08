/**
 * Экспорт типов для платежей
 */
export type { BasePayment, PaymentStatusOption, PaymentMethodOption, PaymentStatus, PaymentMethod } from './types/base.types';
export type { WebPayResponse } from './types/webpay.types';
export type { CryptoPaymentDetails, CryptoPaymentRequest, CryptoPaymentResponse, CryptoPaymentStatus } from './types/crypto.types';
export type { ProcessHandler, PaymentStatusHandler, CryptoPaymentHandler } from './types/handlers.types';
export type { PaymentTableBodyProps, PaymentFormProps } from './types/components.types';
export type { UsePaymentStatusHandlerReturn, UseProcessHandlerReturn, UseCryptoPaymentHandlerReturn, UsePaymentFormReturn } from './types/hooks.types';
export type { UseClipboardReturn } from './types/hooks.types';
/**
 * Экспорт констант для статусов и методов оплаты
 */
export { PAYMENT_STATUS, PAYMENT_METHOD, PAYMENT_STATUS_OPTIONS, PAYMENT_METHOD_OPTIONS } from './constants';

/**
 * Экспорт моковых данных для тестирования
 */
export { mockWebPayResponse } from './mock/mockWebPayResponse';
export { mockCryptoResponse } from './mock/mockCryptoResponse';
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
