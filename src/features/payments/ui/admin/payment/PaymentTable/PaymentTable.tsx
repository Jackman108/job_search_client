import { ACTION_TYPES } from "@config";
import { BasePayment, paymentConfig } from "@entities/payment";
import PaymentTableBody from "@features/payments/ui/admin/payment/PaymentTableBody/PaymentTableBody";
import { useEntityFetch, useTableLogic } from "@hooks";
import { LanguageSwitcher } from "@ui";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import PaymentForm from '../PaymentForm/PaymentForm';
import styles from './PaymentTable.module.css';
        

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
        handleCancelAction,
    } = useTableLogic<BasePayment>(paymentConfig, useEntityFetch, ACTION_TYPES.PAYMENT);

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
                    handleCancelClick={handleCancelAction}
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