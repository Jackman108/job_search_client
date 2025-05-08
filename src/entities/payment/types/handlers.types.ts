import { BasePayment } from './base.types'; 
import { CryptoPaymentDetails } from './crypto.types';

/**
 * Интерфейс для обработчика платежного процесса
 */
export interface ProcessHandler {
    /** Обработчик платежного процесса */
    handleProcess: (paymentData: BasePayment) => Promise<CryptoPaymentDetails>;
    /** Флаг загрузки */
    loadingProcess: boolean;
    /** Ошибка процесса */
    errorProcess: any;
}

/**
 * Интерфейс для обработчика статуса платежа
 */
export interface PaymentStatusHandler {
    /** Обработчик успешного платежа */
    handleProcessSuccess: (response: any) => void;
    /** Обработчик ошибки платежа */
    handleProcessFailure: (error: any) => void;
}

/**
 * Интерфейс для обработчика криптоплатежей
 */
export interface CryptoPaymentHandler {
    /** Обработчик создания криптоплатежа */
    handleCryptoPayment: (paymentData: BasePayment) => Promise<CryptoPaymentDetails>;
    /** Обработчик проверки статуса криптоплатежа */
    checkCryptoPaymentStatus: (paymentId: string, status: string, confirmations?: number, transactionHash?: string | null) => Promise<any>;
    /** Флаг загрузки */
    loadingCryptoProcess: boolean;
    /** Ошибка процесса */
    errorCryptoProcess: any;
} 