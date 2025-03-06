import React, {useEffect} from 'react';
import RenderSelect from "@ui/RenderSelect/RenderSelect";
import Button from "@ui/Button/Button";
import {useFormState} from "@features/resume/hooks/useFormState";
import {useTranslation} from "react-i18next";
import RenderInput from "@ui/RenderInput/RenderInput";
import {PaymentFormProps, PaymentItem} from "@features/payments/types/Payment.types";
import {paymentMethodOptions, paymentStatusOptions} from "@features/payments/config/paymentConfig";

const PaymentUserForm: React.FC<PaymentFormProps> = ({initialData, onSubmit, handleCancelClick, isLoading}) => {
    const {formData, setFormData} = useFormState<Partial<PaymentItem>>();
    const {t} = useTranslation('payments');
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                payment_status: paymentStatusOptions[0].value,
                payment_method: paymentMethodOptions[0].value
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
        handleCancelClick()
    };

    return (
        <form onSubmit={handleSubmit}>
            <RenderInput
                label={t('form.subscriptionId')}
                name="subscription_id"
                value={formData.subscription_id || ''}
                onChange={handleChange}
                type="text"
                isLoading={isLoading}
            />
            <RenderInput
                label={t('form.amount')}
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                type="number"
                isLoading={isLoading}
            />
            <RenderSelect
                label={t('form.paymentMethod')}
                options={paymentMethodOptions}
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                isLoading={isLoading}
            />
            <Button type="submit" variant="primary" disabled={isLoading}>
                {t('form.pay')}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancelClick} disabled={isLoading}>
                {t('form.cancel')}
            </Button>
        </form>
    );
};

export default PaymentUserForm;