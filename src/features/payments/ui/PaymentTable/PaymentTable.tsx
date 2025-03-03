import React from 'react';
import {Link} from 'react-router-dom';
import styles from './PaymentTable.module.css';
import PaymentForm from '../PaymentForm/PaymentForm';
import PaymentTableBody from "@features/payments/ui/PaymentTableBody/PaymentTableBody";
import {ACTION_TYPES} from "@config/actionTypes";
import LanguageSwitcher from "@ui/LanguageSwitcher/LanguageSwitcher";
import {useTableLogic} from "@hooks/useTableLogic";
import {Payment} from "@features/payments/types/Payment.types";
import {paymentConfig} from "@features/payments/config/paymentConfig";
import useFetchPayment from "@features/payments/hooks/useFetchPayment";
import {useTranslation} from "react-i18next";

const PaymentTable = () => {
    const {t} = useTranslation('payments');

    const {
        data: paymentData,
        loading,
        error,
        formData,
        isEditing,
        showForm,
        handleEditClick,
        handleDelete,
        handleFormSubmit,
        handleToggleForm,
        handleCancelClick,
    } = useTableLogic<Payment>(paymentConfig, useFetchPayment, ACTION_TYPES.PAYMENT);

    return (
        <div className={styles.container}>
            <LanguageSwitcher/>

            <Link to="/" className="home-button">🏠</Link>
            <h1>{t('payments.title')}</h1>
            <button onClick={handleToggleForm}>
                {showForm ? t('payments.hideForm') : t('payments.addPayment')}
            </button>
            {(showForm || isEditing[ACTION_TYPES.PAYMENT]) && (
                <PaymentForm
                    initialData={formData}
                    onSubmit={handleFormSubmit}
                    handleCancelClick={() => {
                        handleCancelClick(ACTION_TYPES.PAYMENT);
                        handleToggleForm();
                    }}
                    isLoading={loading}
                />
            )}
            {loading && <p>{t('common.loading')}</p>}
            {error && <p>{t('common.error')}: {error.message}</p>}
            {paymentData && paymentData.length > 0 ? (
                <PaymentTableBody
                    paymentData={paymentData}
                    handleEditClick={(type, item) => {
                        handleEditClick(type, item);
                        handleToggleForm();
                    }}
                    handleDelete={handleDelete}
                />
            ) : (
                !loading && !error && <p>{t('payments.noData')}</p>)}
        </div>
    );
};

export default PaymentTable;