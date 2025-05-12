import React from 'react';
import { CryptoPaymentDetails } from '@entities/payment';
import { Button } from '@ui';
import { ACTION_TYPES } from '@config';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@utils';
import styles from '../CryptoPaymentTable/CryptoPaymentTable.module.css';

interface CryptoPaymentTableBodyProps {
    paymentData: CryptoPaymentDetails[];
    handleEditClick: (type: string, item: CryptoPaymentDetails) => void;
    handleDelete: (id: string) => void;
}

const CryptoPaymentTableBody: React.FC<CryptoPaymentTableBodyProps> = ({ paymentData, handleEditClick, handleDelete }) => {
    const { t } = useTranslation('cryptoPayments');
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>{t('tableHeaders.id')}</th>
                    <th>{t('tableHeaders.subscriptionId')}</th>
                    <th>{t('tableHeaders.amount')}</th>
                    <th>{t('tableHeaders.currency')}</th>
                    <th>{t('tableHeaders.network')}</th>
                    <th>{t('tableHeaders.cryptoAddress')}</th>
                    <th>{t('tableHeaders.cryptoAmount')}</th>
                    <th>{t('tableHeaders.status')}</th>
                    <th>{t('tableHeaders.createdAt')}</th>
                    <th>{t('tableHeaders.expiresAt')}</th>
                    <th>{t('tableHeaders.transactionHash')}</th>
                    <th>{t('tableHeaders.walletProvider')}</th>
                    <th>{t('tableHeaders.actions')}</th>
                </tr>
            </thead>
            <tbody>
                {paymentData.map(p => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.subscription_id}</td>
                        <td>{p.amount}</td>
                        <td>{p.currency}</td>
                        <td>{p.network}</td>
                        <td>{p.crypto_address}</td>
                        <td>{p.crypto_amount}</td>
                        <td>{p.status}</td>
                        <td>{p.created_at ? formatDate(p.created_at.toString()).date : ''}</td>
                        <td>{p.expires_at ? formatDate(p.expires_at.toString()).date : ''}</td>
                        <td>{p.transaction_hash}</td>
                        <td>{p.wallet_provider}</td>
                        <td className={styles.actions}>
                            <Button onClick={() => handleEditClick(ACTION_TYPES.CRYPTO_PAYMENT, p)}>
                                {t('tableActions.edit')}
                            </Button>
                            <Button onClick={() => handleDelete(p.id!)}>
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