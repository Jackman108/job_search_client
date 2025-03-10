import React, {useEffect} from 'react';
import {PAYMENT_STATUS_OPTIONS, PaymentStatusOption, PaymentTypes} from "@entities/payment";
import {PaymentFormProps} from '@features/payments/props/Payment.props';
import {Button, RenderInput, RenderSelect} from "@ui";
import {useFormState} from "@hooks";
import {useTranslation} from "react-i18next";

const PaymentForm: React.FC<PaymentFormProps> = ({initialData, onSubmit, handleCancelClick, isLoading}) => {
    const {formData, setFormData} = useFormState<Partial<PaymentTypes>>();
    const {t} = useTranslation('payments');
    const statusOptions: PaymentStatusOption[] = PAYMENT_STATUS_OPTIONS;

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                user_id: initialData.subscription_id || '',
                amount: initialData.amount || 0,
                payment_method: initialData.payment_method || '',
                payment_status: initialData.payment_status || 'pending',
            });
        }
    }, [initialData, setFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <RenderInput
                label={t('form.userId')}
                name="user_id"
                value={formData.user_id || ''}
                onChange={handleChange}
                type="text"
                isLoading={isLoading}
            />
            <RenderSelect
                label={t('form.paymentStatus')}
                options={statusOptions}
                value={formData.payment_status || 'pending'}
                name="payment_status"
                onChange={handleChange}
                isLoading={isLoading}
            />
            <RenderInput
                label={t('form.amount')}
                name="amount"
                value={formData.amount || 0}
                onChange={handleChange}
                type="number"
                isLoading={isLoading}
            />
            <RenderInput
                label={t('form.paymentMethod')}
                name="payment_method"
                value={formData.payment_method || ''}
                onChange={handleChange}
                type="text"
                isLoading={isLoading}
            />
            <Button type="submit" variant="primary" disabled={isLoading}>
                {initialData ? t('form.save') : t('form.create')}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancelClick} disabled={isLoading}>
                {t('form.cancel')}
            </Button>
        </form>
    );
};

export default PaymentForm;