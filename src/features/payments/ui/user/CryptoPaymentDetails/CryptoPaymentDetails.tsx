import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CryptoPaymentDetails as CryptoDetails } from '@entities/payment';
import { QRCodeSVG } from 'qrcode.react';
import styles from './CryptoPaymentDetails.module.css';
import { usePaymentTimer, useClipboard, useTransactionConfirmations } from '@features/payments/hooks';
import { useCryptoPaymentHandler } from '@features/payments/hooks/useCryptoPaymentHandler';
import { SUPPORTED_CRYPTO_NETWORKS, getWalletUrl } from '@entities/payment/config/cryptoPaymentConfig';
import { CRYPTO_WALLET_ADDRESSES } from '@entities/payment/config/cryptoWalletConfig';
import { CRYPTO_EXCHANGE_RATES } from '@entities/payment/config/cryptoExchangeConfig';
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
    const [showQR, setShowQR] = useState(true);
    const [isAddressCopied, setIsAddressCopied] = useState(false);
    const [isAmountCopied, setIsAmountCopied] = useState(false);
    // Состояние для выбранной сети и адреса
    const [network, setNetwork] = useState<string>(details.network);
    const initialAddress = details.crypto_address || CRYPTO_WALLET_ADDRESSES[details.network] || '';
    const [address, setAddress] = useState<string>(initialAddress);
    // Конвертированная сумма в крипте
    const initialCryptoAmount = (details.amount * (CRYPTO_EXCHANGE_RATES[details.network] || 0)).toFixed(8);
    const [cryptoAmount, setCryptoAmount] = useState<string>(initialCryptoAmount);

    const timeLeft = usePaymentTimer(details.expires_at);
    const { copyToClipboard } = useClipboard();
    const { getConfirmationProgress, getConfirmationText } = useTransactionConfirmations(
        network,
        details.confirmations
    );
    const { updateCryptoOptions, loadingCryptoProcess, errorCryptoProcess } = useCryptoPaymentHandler();

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

    // Открыть кошелёк: обновляем сеть/адрес на бэке и открываем ссылку
    const handleOpenWallet = async () => {
        try {
            const updated = await updateCryptoOptions({
                paymentId: details.id,
                network,
                crypto_address: address,
                crypto_amount: cryptoAmount
            });
            onUpdate?.(updated);
        } catch (err) {
            console.error('Ошибка обновления крипто-опций:', errorCryptoProcess || err);
        }
        window.open(getWalletUrl(network, address, cryptoAmount), '_blank');
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
                            onChange={async e => {
                                const net = e.target.value;
                                const addr = CRYPTO_WALLET_ADDRESSES[net] || '';
                                const rate = CRYPTO_EXCHANGE_RATES[net] || 0;
                                const newAmt = (details.amount * rate).toFixed(8);
                                setNetwork(net);
                                setAddress(addr);
                                setCryptoAmount(newAmt);
                                try {
                                    const updated = await updateCryptoOptions({
                                        paymentId: details.id,
                                        network: net,
                                        crypto_address: addr,
                                        crypto_amount: newAmt
                                    });
                                    onUpdate?.(updated);
                                } catch (err) {
                                    console.error('Error updating crypto options:', err);
                                }
                            }}
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
                                onClick={() => handleCopy(address, setIsAddressCopied)}
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
                                onClick={() => handleCopy(`${cryptoAmount} ${details.currency}`, setIsAmountCopied)}
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