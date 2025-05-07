import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CryptoPaymentDetails as CryptoDetails } from '@entities/payment/types/CryptoPayment.types';
import { QRCodeSVG } from 'qrcode.react';
import styles from './CryptoPaymentDetails.module.css';
import { CRYPTO_PAYMENT_SETTINGS } from '@entities/payment';

/**
 * Пропсы для компонента деталей криптоплатежа
 */
interface CryptoPaymentDetailsProps {
    details: CryptoDetails;
}

/**
 * Компонент для отображения деталей криптоплатежа
 * Включает в себя адрес, сумму, QR-код, статус и другие детали платежа
 */
const CryptoPaymentDetails: React.FC<CryptoPaymentDetailsProps> = ({ details }) => {
    const { t } = useTranslation('payments');
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [isCopied, setIsCopied] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [showQR, setShowQR] = useState(true);

    /**
     * Обновляет оставшееся время до истечения платежа
     */
    useEffect(() => {
        const updateTimeLeft = () => {
            const now = new Date().getTime();
            const expires = new Date(details.expires_at).getTime();
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
    }, [details.expires_at, t]);

    /**
     * Копирует криптоадрес в буфер обмена
     */
    const handleCopyAddress = async () => {
        try {
            await navigator.clipboard.writeText(details.crypto_address);
            setIsCopied(true);
            setNotification({ message: t('crypto.copied'), type: 'success' });
            setTimeout(() => {
                setIsCopied(false);
                setNotification(null);
            }, 2000);
        } catch (error) {
            setNotification({ message: t('common.error'), type: 'error' });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    /**
     * Копирует сумму платежа в буфер обмена
     */
    const handleCopyAmount = async () => {
        try {
            await navigator.clipboard.writeText(details.crypto_amount);
            setNotification({ message: t('crypto.amountCopied'), type: 'success' });
            setTimeout(() => setNotification(null), 2000);
        } catch (error) {
            setNotification({ message: t('common.error'), type: 'error' });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    /**
     * Возвращает CSS класс для цвета статуса платежа
     */
    const getStatusColor = (status: string) => {
        if (!status) return styles.statusPending;
        
        switch (status.toLowerCase()) {
            case 'completed':
                return styles.statusCompleted;
            case 'failed':
                return styles.statusFailed;
            case 'expired':
                return styles.statusExpired;
            default:
                return styles.statusPending;
        }
    };

    /**
     * Возвращает компонент с прогрессом подтверждений транзакции
     */
    const getConfirmationStatus = () => {
        if (!details.confirmations) return null;
        
        const minConfirmations = CRYPTO_PAYMENT_SETTINGS.minConfirmations[details.network as keyof typeof CRYPTO_PAYMENT_SETTINGS.minConfirmations] || 3;
        const progress = Math.min((details.confirmations / minConfirmations) * 100, 100);
        
        return (
            <div className={styles.confirmationStatus}>
                <div className={styles.confirmationProgress}>
                    <div 
                        className={styles.confirmationBar} 
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className={styles.confirmationText}>
                    {t('crypto.confirmations', { 
                        current: details.confirmations, 
                        required: minConfirmations 
                    })}
                </span>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {notification && (
                <div className={`${styles.notification} ${styles[notification.type]}`}>
                    {notification.message}
                </div>
            )}

            <h3 className={styles.title}>{t('crypto.title')}</h3>
            
            <div className={styles.details}>
                <div className={styles.row}>
                    <span className={styles.label}>{t('crypto.network')}:</span>
                    <span className={styles.value}>{details.network}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.label}>{t('crypto.address')}:</span>
                    <div className={styles.addressContainer}>
                        <span className={styles.value}>{details.crypto_address}</span>
                        <button
                            className={`${styles.copyButton} ${isCopied ? styles.copied : ''}`}
                            onClick={handleCopyAddress}
                            title={t('crypto.copy')}
                        >
                            {isCopied ? t('crypto.copied') : t('crypto.copy')}
                        </button>
                    </div>
                </div>

                <div className={styles.row}>
                    <span className={styles.label}>{t('crypto.amount')}:</span>
                    <div className={styles.amountContainer}>
                        <span className={styles.value}>
                            {details.crypto_amount} {details.currency}
                        </span>
                        <button
                            className={styles.copyButton}
                            onClick={handleCopyAmount}
                            title={t('crypto.copyAmount')}
                        >
                            {t('crypto.copy')}
                        </button>
                    </div>
                </div>

                {details.payment_url && (
                    <div className={styles.qrCode}>
                        <button 
                            className={styles.toggleQR}
                            onClick={() => setShowQR(!showQR)}
                        >
                            {showQR ? t('crypto.hideQR') : t('crypto.showQR')}
                        </button>
                        {showQR && (
                            <QRCodeSVG
                                value={details.payment_url}
                                size={200}
                                level="H"
                                includeMargin={true}
                            />
                        )}
                    </div>
                )}

                <div className={styles.row}>
                    <span className={styles.label}>{t('crypto.expires')}:</span>
                    <span className={styles.value}>{timeLeft}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.label}>{t('crypto.status')}:</span>
                    <span className={`${styles.value} ${getStatusColor(details.status)}`}>
                        {t(`crypto.statusTypes.${details.status.toLowerCase()}`)}
                    </span>
                </div>

                {getConfirmationStatus()}

                {details.transaction_hash && (
                    <div className={styles.row}>
                        <span className={styles.label}>{t('crypto.transactionHash')}:</span>
                        <span className={styles.value}>{details.transaction_hash}</span>
                    </div>
                )}
            </div>

            <div className={styles.warning}>
                {t('crypto.warning')}
            </div>

            {details.payment_url && (
                <div className={styles.paymentUrl}>
                    <a 
                        href={details.payment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.paymentButton}
                    >
                        {t('crypto.openWallet')}
                    </a>
                </div>
            )}
        </div>
    );
};

export default CryptoPaymentDetails; 