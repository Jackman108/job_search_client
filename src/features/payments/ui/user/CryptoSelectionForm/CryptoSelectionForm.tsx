import React from 'react';
import { useTranslation } from 'react-i18next';
import { CryptoPaymentDetails as CryptoDetails, PAYMENT_STATUS } from '@entities/payment';
import { QRCodeSVG } from 'qrcode.react';
import styles from './CryptoSelectionForm.module.css';
import { useCryptoForm } from '@features/payments/hooks/crypto/useCryptoForm';
import { SUPPORTED_CRYPTO_NETWORKS, getWalletUrl } from '@entities/payment/config/cryptoPaymentConfig';
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
const CryptoSelectionForm: React.FC<CryptoPaymentDetailsProps> = ({ details, onUpdate }) => {
    const { t } = useTranslation('cryptoPayments');
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
    } = useCryptoForm(details, onUpdate);

    /**
     * Возвращает CSS класс для цвета статуса платежа
     */
    const getStatusColor = (status: string) => {
        if (!status) return styles.statusPending;
        
        switch (status.toLowerCase()) {
            case PAYMENT_STATUS.COMPLETED:
                return styles.statusCompleted;
            case PAYMENT_STATUS.FAILED:
                return styles.statusFailed;
            case PAYMENT_STATUS.EXPIRED:
                return styles.statusExpired;
            default:
                return styles.statusPending;
        }
    };

    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.title}>{t('form.title')}</h3>
                
                <div className={styles.details}>
                    <div className={styles.row}>
                        <RenderSelect
                            label={t('form.network')}
                            name="network"
                            options={SUPPORTED_CRYPTO_NETWORKS}
                            value={network}
                            onChange={handleNetworkChange}
                            isLoading={loadingCryptoProcess}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>{t('form.address')}:</span>
                        <div className={styles.addressContainer}>
                            <span className={styles.value}>{address}</span>
                            <button
                                className={`${styles.copyButton} ${isAddressCopied ? styles.copied : ''}`}
                                onClick={handleCopyAddress}
                                title={t('form.copy')}
                            >
                                {isAddressCopied ? t('form.copied') : t('form.copy')}
                            </button>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>{t('form.amount')}:</span>
                        <div className={styles.amountContainer}>
                            <span className={styles.value}>
                                {cryptoAmount} {details.currency}
                            </span>
                            <button
                                className={`${styles.copyButton} ${isAmountCopied ? styles.copied : ''}`}
                                onClick={handleCopyAmount}
                                title={t('form.copyAmount')}
                            >
                                {isAmountCopied ? t('form.copied') : t('form.copy')}
                            </button>
                        </div>
                    </div>

                    {address && (
                        <div className={styles.qrCode}>
                            <button
                                className={styles.toggleQR}
                                onClick={toggleQR}
                            >
                                {showQR ? t('form.hideQR') : t('form.showQR')}
                            </button>
                            {showQR && (
                                <QRCodeSVG
                                    value={
                                        details.payment_url ?? getWalletUrl(
                                            network,
                                            address,
                                            cryptoAmount
                                        )
                                    }
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                            )}
                        </div>
                    )}

                    <div className={styles.row}>
                        <span className={styles.label}>{t('form.expires')}:</span>
                        <span className={styles.value}>{timeLeft}</span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.label}>{t('form.status')}:</span>
                        <span className={`${styles.value} ${getStatusColor(details.status ?? '')}`}>
                            {t(`form.statusTypes.${(details.status ?? '').toLowerCase()}`)}
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
                            <span className={styles.label}>{t('form.transactionHash')}:</span>
                            <span className={styles.value}>{details.transaction_hash}</span>
                        </div>
                    )}
                </div>

                <div className={styles.warning}>
                    {t('form.warning')}
                </div>

                {address && (
                    <div className={styles.paymentUrl}>
                        <button
                            onClick={handleOpenWallet}
                            className={styles.paymentButton}
                        >{t('form.openWallet')}</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CryptoSelectionForm; 