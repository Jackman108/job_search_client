import React, {useEffect} from 'react';
import {Payment, PaymentFormProps} from '../../types/Payment.types';
import RenderSelect from "@ui/RenderSelect/RenderSelect";
import Button from "@ui/Button/Button";
import {useFormState} from "@features/resume/hooks/useFormState";
import {paymentStatusOptions} from "@features/payments/config/paymentConfig";
import {useTranslation} from "react-i18next";
import RenderInput from "@ui/RenderInput/RenderInput";

const PaymentForm: React.FC<PaymentFormProps> = ({initialData, onSubmit, handleCancelClick, isLoading}) => {
    const {formData, setFormData} = useFormState<Partial<Payment>>();
    const {t} = useTranslation('payments');

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                userId: initialData.user_id || '',

                amount: initialData.amount || 0,
                paymentMethod: initialData.payment_method || '',
                paymentStatus: initialData.payment_status || 'pending',
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
                value={formData.userId || ''}
                onChange={handleChange}
                type="text"
                isLoading={isLoading}
            />
            <RenderSelect
                label={t('form.paymentStatus')}
                options={paymentStatusOptions}
                value={formData.paymentStatus || 'pending'}
                name="paymentStatus"
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
                name="paymentMethod"
                value={formData.paymentMethod || ''}
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