import { ACTION_TYPES } from '@config';
import { CryptoPaymentDetails } from '@entities/payment';
import { cryptoPaymentConfig } from '@entities/payment/config/cryptoPaymentConfig';
import { useEntityFetch, useTableLogic } from '@hooks';
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
        data: payments,
        loading,
        error,
        formData,
        isEditing,
        showForm,
        handleEditClick,
        handleDelete,
        handleFormSubmit,
        handleToggleForm,
        handleCancelAction
    } = useTableLogic<CryptoPaymentDetails>(
        cryptoPaymentConfig,
        useEntityFetch,
        ACTION_TYPES.CRYPTO
    );

    const { t } = useTranslation('cryptoPayments');

    if (loading) return <p>{t('common.loading')}</p>;
    if (error) return <p>{t('common.error')}: {error.message}</p>;

    return (
        <div className={styles.container}>
            <Link to="/" className="home-button">🏠</Link>
            <h1 className={styles.title}>{t('cryptoPayments.title')}</h1>
            <button className={styles.addButton} onClick={handleToggleForm}>
                {showForm ? t('cryptoPayments.hideForm') : t('cryptoPayments.addPayment')}
            </button>
            {(showForm || isEditing[ACTION_TYPES.CRYPTO]) && (
                <CryptoPaymentForm
                    initialData={formData}
                    onSubmit={handleFormSubmit}
                    handleCancelClick={handleCancelAction}
                    isLoading={loading}
                />
            )}
            {payments.length > 0 ? (
                <div className={styles.tableWrapper}>
                    <CryptoPaymentTableBody
                        cryptoPaymentData={payments}
                        handleEditClick={(type, item) => {
                             handleEditClick(type, item);
                              handleToggleForm(); 
                            }}
                            handleDelete={handleDelete}
                    />
                </div>
            ) : (
                !loading && !error && <p>{t('payments.noData')}</p>
            )}
        </div>
    );
};

export default CryptoPaymentTable; 