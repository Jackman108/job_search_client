import React from 'react';
import { Button } from '@ui';
import { ACTION_TYPES } from '@config';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@utils';
import styles from '../CryptoPaymentTable/CryptoPaymentTable.module.css';
import { CryptoPaymentTableBodyProps } from '@entities/payment/types/components.types';


const CryptoPaymentTableBody: React.FC<CryptoPaymentTableBodyProps> = ({ cryptoPaymentData, handleEditClick, handleDelete }) => {
    const { t } = useTranslation('cryptoPayments');
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>{t('tableHeaders.id')}</th>
                    <th>{t('tableHeaders.subscriptionId')}</th>
                    <th>{t('tableHeaders.status')}</th>
                    <th>{t('tableHeaders.amount')}</th>
                    <th>{t('tableHeaders.currency')}</th>
                    <th>{t('tableHeaders.network')}</th>
                    <th>{t('tableHeaders.cryptoAddress')}</th>
                    <th>{t('tableHeaders.cryptoAmount')}</th>
                    <th>{t('tableHeaders.createdAt')}</th>
                    <th>{t('tableHeaders.expiresAt')}</th>
                    <th>{t('tableHeaders.transactionHash')}</th>
                    <th>{t('tableHeaders.walletProvider')}</th>
                    <th>{t('tableHeaders.actions')}</th>
                </tr>
            </thead>
            <tbody>
                {cryptoPaymentData.map(crypto => (
                    <tr key={crypto.id}>
                        <td>{crypto.id}</td>
                        <td>{crypto.subscription_id}</td>
                        <td>{crypto.status}</td>
                        <td>{crypto.amount}</td>
                        <td>{crypto.currency}</td>
                        <td>{crypto.network}</td>
                        <td>{crypto.crypto_address}</td>
                        <td>{crypto.crypto_amount}</td>
                        <td>{crypto.created_at ? formatDate(crypto.created_at.toString()).date : ''}</td>
                        <td>{crypto.expires_at ? formatDate(crypto.expires_at.toString()).date : ''}</td>
                        <td>{crypto.transaction_hash}</td>
                        <td>{crypto.wallet_provider}</td>
                        <td className={styles.actions}>
                            <Button onClick={() => handleEditClick(ACTION_TYPES.CRYPTO, crypto)}>
                                {t('tableActions.edit')}
                            </Button>
                            <Button onClick={() => handleDelete(crypto.id!)}>
                                {t('tableActions.delete')}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CryptoPaymentTableBody; 