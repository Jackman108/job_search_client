import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CryptoPaymentDetails as CryptoDetails } from '@entities/payment';
import { QRCodeSVG } from 'qrcode.react';
import styles from './CryptoPaymentDetails.module.css';
import { usePaymentTimer, useClipboard, useTransactionConfirmations } from '@features/payments/hooks';

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
    const [showQR, setShowQR] = useState(true);
    const [isAddressCopied, setIsAddressCopied] = useState(false);
    const [isAmountCopied, setIsAmountCopied] = useState(false);

    const timeLeft = usePaymentTimer(details.expires_at);
    const { copyToClipboard } = useClipboard();
    const { getConfirmationProgress, getConfirmationText } = useTransactionConfirmations(
        details.network,
        details.confirmations
    );

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

    const handleCopy = async (text: string | number, setCopied: (value: boolean) => void) => {
        await copyToClipboard(String(text));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.container}>
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
                            className={`${styles.copyButton} ${isAddressCopied ? styles.copied : ''}`}
                            onClick={() => handleCopy(details.crypto_address, setIsAddressCopied)}
                            title={t('crypto.copy')}
                        >
                            {isAddressCopied ? t('crypto.copied') : t('crypto.copy')}
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
                            className={`${styles.copyButton} ${isAmountCopied ? styles.copied : ''}`}
                            onClick={() => handleCopy(`${details.crypto_amount} ${details.currency}`, setIsAmountCopied)}
                            title={t('crypto.copyAmount')}
                        >
                            {isAmountCopied ? t('crypto.copied') : t('crypto.copy')}
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

                {details.confirmations && (
                    <div className={styles.confirmationStatus}>
                        <div className={styles.confirmationProgress}>
                            <div 
                                className={styles.confirmationBar} 
                                style={{ width: `${getConfirmationProgress()}%` }}
                            />
                        </div>
                        <span className={styles.confirmationText}>
                            {getConfirmationText()}
                        </span>
                    </div>
                )}

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