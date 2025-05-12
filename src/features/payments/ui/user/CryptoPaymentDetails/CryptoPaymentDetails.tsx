import React from 'react';
import { useTranslation } from 'react-i18next';
import { CryptoPaymentDetails as CryptoDetails } from '@entities/payment';
import { QRCodeSVG } from 'qrcode.react';
import styles from './CryptoPaymentDetails.module.css';
import { useCryptoPaymentViewModel } from '@features/payments/hooks/useCryptoPaymentViewModel';
import { SUPPORTED_CRYPTO_NETWORKS } from '@entities/payment/config/cryptoPaymentConfig';
import { RenderSelect } from '@shared/ui';

/**
 * Пропсы для компонента деталей криптоплатежа
 */
interface CryptoPaymentDetailsProps {
    details: CryptoDetails;
    /** Коллбек при обновлении полных деталей платежа */
    onUpdate?: (updated: CryptoDetails) => void;
}

/**
 * Компонент для отображения деталей криптоплатежа
 * Включает в себя адрес, сумму, QR-код, статус и другие детали платежа
 */
const CryptoPaymentDetails: React.FC<CryptoPaymentDetailsProps> = ({ details, onUpdate }) => {
    const { t } = useTranslation('payments');
    const {
        showQR,
        toggleQR,
        network,
        address,
        cryptoAmount,
        isAddressCopied,
        isAmountCopied,
        handleCopyAddress,
        handleCopyAmount,
        timeLeft,
        getConfirmationProgress,
        getConfirmationText,
        handleNetworkChange,
        handleOpenWallet,
        loadingCryptoProcess,
    } = useCryptoPaymentViewModel(details, onUpdate);

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

    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.title}>{t('crypto.title')}</h3>
                
                <div className={styles.details}>
                    <div className={styles.row}>
                        <span className={styles.label}>{t('crypto.network')}:</span>
                        <RenderSelect
                            label={t('crypto.network')}
                            name="network"
                            options={SUPPORTED_CRYPTO_NETWORKS}
                            value={network}
                            onChange={handleNetworkChange}
                            isLoading={loadingCryptoProcess}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>{t('crypto.address')}:</span>
                        <div className={styles.addressContainer}>
                            <span className={styles.value}>{address}</span>
                            <button
                                className={`${styles.copyButton} ${isAddressCopied ? styles.copied : ''}`}
                                onClick={handleCopyAddress}
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
                                {cryptoAmount} {details.currency}
                            </span>
                            <button
                                className={`${styles.copyButton} ${isAmountCopied ? styles.copied : ''}`}
                                onClick={handleCopyAmount}
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
                                onClick={toggleQR}
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
                        <button
                            onClick={handleOpenWallet}
                            className={styles.paymentButton}
                        >{t('crypto.openWallet')}</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CryptoPaymentDetails; 