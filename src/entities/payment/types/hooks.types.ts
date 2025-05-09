import { BasePayment } from './base.types';
import { CryptoPaymentDetails } from './crypto.types';
import { WebPayResponse } from './webpay.types';

/**
 * Интерфейс для хука usePaymentForm
 */
export interface UsePaymentFormReturn {
    /** Данные формы */
    formData: Partial<BasePayment>;
    /** Обработчик изменения полей */
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    /** Обработчик отправки формы */
    handleSubmit: (e: React.FormEvent) => void;
    /** Обработчик отмены */
    handleCancel: () => void;
    /** Флаг загрузки */
    isLoading: boolean;
}

/**
 * Интерфейс для хука useCryptoPaymentHandler
 */
export interface UseCryptoPaymentHandlerReturn {
    /** Обработчик создания криптоплатежа */
    handleCryptoPayment: (paymentData: BasePayment) => Promise<CryptoPaymentDetails>;
    /** Обработчик проверки статуса криптоплатежа */
    checkCryptoPaymentStatus: (paymentId: string, status: string, confirmations?: number, transactionHash?: string | null) => Promise<any>;
    /** Обработчик обновления опций платежа */
    updateCryptoOptions: (data: { paymentId: string; network?: string; crypto_address?: string; crypto_amount?: string }) => Promise<any>;
    /** Флаг загрузки */
    loadingCryptoProcess: boolean;
    /** Ошибка процесса */
    errorCryptoProcess: any;
}

/**
 * Интерфейс для хука usePaymentStatusHandler
 */
export interface UsePaymentStatusHandlerReturn {
    /** Обработчик успешного платежа */
    handleProcessSuccess: (response: any) => void;
    /** Обработчик ошибки платежа */
    handleProcessFailure: (error: any) => void;
}

/**
 * Интерфейс для хука useProcessHandler
 */
export interface UseProcessHandlerReturn {
    /** Обработчик платежного процесса */
    handleProcess: (paymentData: BasePayment) => Promise<CryptoPaymentDetails | WebPayResponse | undefined>;
    /** Флаг загрузки */
    loadingProcess: boolean;
    /** Ошибка процесса */
    errorProcess: any;
}

/**
 * Интерфейс для хука useClipboard
 */
export interface UseClipboardReturn {
    /** Функция для копирования текста в буфер обмена */
    copyToClipboard: (text: string) => Promise<void>;
    /** Флаг успешного копирования */
    isCopied: boolean;
    /** Функция сброса состояния копирования */
    resetCopyState: () => void;
} 