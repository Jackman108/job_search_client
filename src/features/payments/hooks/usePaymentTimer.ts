import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Хук для отслеживания оставшегося времени до истечения платежа
 * @param expiresAt - Дата истечения платежа
 * @returns Оставшееся время в формате HH:MM:SS или сообщение об истечении
 */
export const usePaymentTimer = (expiresAt: Date) => {
    const { t } = useTranslation('payments');
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        const updateTimeLeft = () => {
            const now = new Date().getTime();
            const expires = new Date(expiresAt).getTime();
            const difference = expires - now;

            if (difference <= 0) {
                setTimeLeft(t('crypto.expired'));
                return;
            }

            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        updateTimeLeft();
        const interval = setInterval(updateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [expiresAt, t]);

    return timeLeft;
}; 