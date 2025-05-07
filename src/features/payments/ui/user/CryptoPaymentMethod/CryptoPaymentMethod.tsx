import React from 'react';
import { useTranslation } from 'react-i18next';
import { mockCryptoPaymentMethods } from '@entities/payment/mock/mockCryptoResponse';
import styles from './CryptoPaymentMethod.module.css';

interface CryptoPaymentMethodProps {
    selectedMethod: string;
    onMethodSelect: (methodId: string) => void;
}

const CryptoPaymentMethod: React.FC<CryptoPaymentMethodProps> = ({ selectedMethod, onMethodSelect }) => {
    const { t } = useTranslation('payments');

    return (
        <div className={styles.container}>
            <h3>{t('crypto.selectMethod')}</h3>
            <div className={styles.methods}>
                {mockCryptoPaymentMethods.map(method => (
                    <div
                        key={method.id}
                        className={`${styles.method} ${selectedMethod === method.id ? styles.selected : ''}`}
                        onClick={() => onMethodSelect(method.id)}
                    >
                        <img src={method.icon} alt={method.name} className={styles.icon} />
                        <div className={styles.details}>
                            <h4>{method.name}</h4>
                            <p>{t('crypto.processingTime', { time: method.processingTime })}</p>
                            <p>{t('crypto.confirmations', { count: method.confirmations })}</p>
                            <p>{t('crypto.fee', { fee: method.fee })}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CryptoPaymentMethod; 