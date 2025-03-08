import React, {useCallback, useEffect} from 'react';
import RenderSelect from "@ui/RenderSelect/RenderSelect";
import Button from "@ui/Button/Button";
import {useFormState} from "@features/resume/hooks/useFormState";
import {useTranslation} from "react-i18next";
import {PaymentFormProps, PaymentItem} from "@features/payments/types/Payment.types";
import {paymentMethodOptions, paymentStatusOptions} from "@features/payments/config/paymentConfig";
import RenderRow from "@ui/RenderRow/RenderRow";

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

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }, [setFormData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        handleCancelClick()
    };

    return (
        <form onSubmit={handleSubmit}>
            <RenderRow label={t('form.amount')} value={formData.amount}/>
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