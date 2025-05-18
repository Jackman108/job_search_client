import { ACTION_TYPES } from '@config';
import { useCryptoPaymentLogic } from '@features/payments/hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CryptoPaymentForm from '../CryptoPaymentForm/CryptoPaymentForm';
import CryptoPaymentTableBody from '../CryptoPaymentTableBody/CryptoPaymentTableBody';
import styles from './CryptoPaymentTable.module.css';

/**
 * Компонент таблицы криптоплатежей для админки
 */
const CryptoPaymentTable: React.FC = () => {
    
    const {
        cryptoData,
        cryptoLoading,
        cryptoError,
        cryptoFormData,
        cryptoIsEditing,
        cryptoShowForm,
        cryptoEditClick,
        cryptoFormSubmit,
        cryptoDelete,
        cryptoToggleForm,
        cryptoCancel,
    } = useCryptoPaymentLogic(); 

    const { t } = useTranslation('cryptoPayments');

    if (cryptoLoading) return <p>{t('common.loading')}</p>;
    if (cryptoError) return <p>{t('common.error')}: {cryptoError.message}</p>;

    return (
        <div className={styles.container}>
            <Link to="/" className="home-button">🏠</Link>
            <h1 className={styles.title}>{t('cryptoPayments.title')}</h1>
            <button className={styles.addButton} onClick={cryptoToggleForm}>
                {cryptoShowForm ? t('cryptoPayments.hideForm') : t('cryptoPayments.addPayment')}
            </button>
            {(cryptoShowForm || cryptoIsEditing[ACTION_TYPES.CRYPTO]) && (
                <CryptoPaymentForm
                    initialData={cryptoFormData}
                    onSubmit={cryptoFormSubmit}
                    handleCancelClick={cryptoCancel}
                    isLoading={cryptoLoading}
                />
            )}
            {cryptoData.length > 0 ? (
                <div className={styles.tableWrapper}>
                    <CryptoPaymentTableBody
                        cryptoPaymentData={cryptoData}
                        handleEditClick={(type, item) => {
                            cryptoEditClick(type, item);
                            cryptoToggleForm(); 
                            }}
                            handleDelete={cryptoDelete}
                    />
                </div>
            ) : (
                !cryptoLoading && !cryptoError && <p>{t('payments.noData')}</p>
            )}
        </div>
    );
};

export default CryptoPaymentTable; 