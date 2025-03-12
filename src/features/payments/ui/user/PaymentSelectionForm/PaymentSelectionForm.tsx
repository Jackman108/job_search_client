import React, {useCallback, useEffect} from 'react';
import {Button, RenderSelect} from "@ui";
import {useFormState} from "@hooks";
import {useTranslation} from "react-i18next";
import {PAYMENT_METHOD, PAYMENT_METHOD_OPTIONS, PAYMENT_STATUS, PaymentTypes,} from "@entities/payment";
import {PaymentFormProps} from "@features/payments/props/Payment.props";
import styles from './PaymentSelectionForm.module.css';

const PaymentSelectionForm: React.FC<PaymentFormProps> = ({initialData, onSubmit, handleCancelClick, isLoading}) => {
    const {formData, setFormData} = useFormState<Partial<PaymentTypes>>();
    const {t} = useTranslation('payments');

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                subscription_id: initialData.subscription_id,
                amount: initialData.amount || 0,
                payment_status: initialData.payment_status || PAYMENT_STATUS.PENDING,
                payment_method: initialData.payment_method || PAYMENT_METHOD.WEBPAY
            });
        }
    }, [initialData, setFormData]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }, [setFormData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <RenderSelect
                label={t('form.paymentMethod')}
                options={PAYMENT_METHOD_OPTIONS}
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                isLoading={isLoading}
            />
            <div className={styles.buttonGroup}>
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {t('form.pay')}
                </Button>
                <Button type="button" variant="secondary" onClick={() => handleCancelClick(formData.id)}
                        disabled={isLoading}>
                    {t('form.cancel')}
                </Button>
            </div>
        </form>
    );
};

export default PaymentSelectionForm;