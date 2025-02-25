import React from 'react';
import {Link} from 'react-router-dom';
import styles from './PaymentTable.module.css';
import useFetchPayment from '../../hooks/useFetchPayment';
import PaymentForm from '../PaymentForm/PaymentForm';
import {Payment} from "@features/payments/types/Payment.types";
import {useFormState} from "@features/resume/hooks/useFormState";
import PaymentTableBody from "@features/payments/ui/PaymentTableBody/PaymentTableBody";
import {usePaymentFormState} from "@features/payments/hooks/usePaymentFormState";
import { paymentConfig} from "@features/payments/config/paymentConfig";
import {ACTION_TYPES} from "@config/actionTypes";

const PaymentTable = () => {
    const {paymentData, loading, error, saveItem, deleteItem} = useFetchPayment(paymentConfig);
    const {formData, isEditing, handleEditClick, resetFormData, handleCancelClick} = useFormState<Payment>();
    const {showForm, handleToggleForm} = usePaymentFormState();


    const handleDelete = async (id: string | number) => {
        try {
            await deleteItem({type: ACTION_TYPES.PAYMENT, id});
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    const handleFormSubmit = async (formData: Partial<Payment>) => {
        try {
            await saveItem({
                type: ACTION_TYPES.PAYMENT,
                id: formData.id,
                formData,
                isEditing: isEditing[ACTION_TYPES.PAYMENT],
            });
            resetFormData();
            handleCancelClick(ACTION_TYPES.PAYMENT);
            handleToggleForm();
        } catch (error) {
            console.error('Error saving payment:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Link to="/" className="home-button">🏠</Link>
            <h1>Оплаты</h1>
            <button onClick={handleToggleForm}>
                {showForm ? 'Скрыть форму' : 'Добавить оплату'}
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
            {loading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error.message}</p>}
            {paymentData.length > 0 ? (
                <PaymentTableBody
                    paymentData={paymentData}
                    handleEditClick={(type, item) => {
                        handleEditClick(type, item);
                        handleToggleForm();
                    }}
                    handleDelete={handleDelete}
                />
            ) : (
                !loading && !error && <p>Нет данных по оплатам.</p>
            )}
        </div>
    );
};

export default PaymentTable;