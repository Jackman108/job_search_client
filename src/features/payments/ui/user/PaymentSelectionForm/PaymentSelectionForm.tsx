import React from 'react';
import { Button, RenderSelect } from "@ui";
import { useTranslation } from "react-i18next";
import { PAYMENT_METHOD_OPTIONS, PAYMENT_METHOD } from "@entities/payment";
import { PaymentFormProps } from "@entities/payment";
import { usePaymentForm } from '@features/payments/hooks';     
import styles from './PaymentSelectionForm.module.css';

/**
 * Компонент формы выбора способа оплаты
 * Отображает форму с выбором метода оплаты и кнопками действий
 */
const PaymentSelectionForm: React.FC<PaymentFormProps> = (props) => {
    const { t } = useTranslation('payments');
    const {
        formData,
        handleChange,
        handleSubmit,
        handleCancel,
        isLoading
    } = usePaymentForm(props);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <RenderSelect
                label={t('form.paymentMethod')}
                options={PAYMENT_METHOD_OPTIONS}
                name="payment_method"
                value={formData.payment_method || PAYMENT_METHOD.WEBPAY}
                onChange={handleChange}
                isLoading={isLoading}
            />
            <div className={styles.buttonGroup}>
                <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isLoading}
                    aria-label={t('form.pay')}
                >
                    {t('form.pay')}
                </Button>
                <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={handleCancel}
                    disabled={isLoading}
                    aria-label={t('form.cancel')}
                >
                    {t('form.cancel')}
                </Button>
            </div>
        </form>
    );
};

export default PaymentSelectionForm;