import { useTranslation } from 'react-i18next';
import { CRYPTO_PAYMENT_SETTINGS } from '@entities/payment';

/**
 * Хук для работы с подтверждениями транзакции
 * @param network - Криптовалютная сеть
 * @param confirmations - Текущее количество подтверждений
 * @returns Функции для работы с подтверждениями и прогрессом
 */
export const useTransactionConfirmations = (network: string, confirmations?: number) => {
    const { t } = useTranslation('payments');

    /**
     * Получает минимальное количество подтверждений для сети
     */
    const getMinConfirmations = () => {
        return CRYPTO_PAYMENT_SETTINGS.minConfirmations[network as keyof typeof CRYPTO_PAYMENT_SETTINGS.minConfirmations] || 3;
    };

    /**
     * Вычисляет прогресс подтверждений
     */
    const getConfirmationProgress = () => {
        if (!confirmations) return 0;
        const minConfirmations = getMinConfirmations();
        return Math.min((confirmations / minConfirmations) * 100, 100);
    };

    /**
     * Получает текст с информацией о подтверждениях
     */
    const getConfirmationText = () => {
        if (!confirmations) return null;
        return t('crypto.confirmations', {
            current: confirmations,
            required: getMinConfirmations()
        });
    };

    return {
        getMinConfirmations,
        getConfirmationProgress,
        getConfirmationText
    };
}; 