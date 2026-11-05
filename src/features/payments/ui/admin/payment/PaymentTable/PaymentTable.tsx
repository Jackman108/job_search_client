import { ACTION_TYPES } from "@config";
import PaymentTableBody from "@features/payments/ui/admin/payment/PaymentTableBody/PaymentTableBody";
import { usePaymentLogic } from "@features/payments/hooks";
import { LanguageSwitcher } from "@ui";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import PaymentForm from '../PaymentForm/PaymentForm';
import styles from './PaymentTable.module.css';
        

const PaymentTable = () => {
    const {t} = useTranslation('payments');

    const {
        paymentData,
        paymentLoading,
        paymentError,
        paymentFormData,
        paymentsIsEditing,
        paymentShowForm,
        paymentEditClick,
        paymentDelete,
        paymentSubmit,
        paymentToggleForm,
        paymentCancel,
    } = usePaymentLogic();

    return (
        <div className={styles.container}>
            <LanguageSwitcher/>

            <Link to="/" className="home-button">🏠</Link>
            <h1>{t('payments.title')}</h1>
            <button onClick={paymentToggleForm}>
                {paymentShowForm ? t('payments.hideForm') : t('payments.addPayment')}
            </button>
            {(paymentShowForm || paymentsIsEditing[ACTION_TYPES.PAYMENT]) && (
                <PaymentForm
                    initialData={paymentFormData}
                    onSubmit={paymentSubmit}
                    handleCancelClick={paymentCancel}
                    isLoading={paymentLoading}
                />
            )}
            {paymentLoading && <p>{t('common.loading')}</p>}
            {paymentError && <p>{t('common.error')}: {paymentError.message}</p>}
            {paymentData && paymentData.length > 0 ? (
                <PaymentTableBody
                    paymentData={paymentData}
                    handleEditClick={paymentEditClick}
                    handleDelete={paymentDelete}
                />
            ) : (
                !paymentLoading && !paymentError && <p>{t('payments.noData')}</p>)}
        </div>
    );
};

export default PaymentTable;