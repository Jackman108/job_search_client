import React, {useEffect} from 'react';
import {Payment, PaymentFormProps} from '../../types/Payment.types';
import RenderRow from "@ui/RenderRow/RenderRow";
import RenderSelect from "@ui/RenderSelect/RenderSelect";
import Button from "@ui/Button/Button";
import {useFormState} from "@features/resume/hooks/useFormState";
import {paymentStatusOptions} from "@features/payments/config/paymentConfig";

const PaymentForm: React.FC<PaymentFormProps> = ({initialData, onSubmit, handleCancelClick, isLoading}) => {
    const {formData, setFormData} = useFormState<Partial<Payment>>();

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                amount: initialData.amount || 0,
                paymentMethod: initialData.paymentMethod || '',
                paymentStatus: initialData.paymentStatus || 'pending',
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
            <RenderRow label="Amount" value={
                <input
                    type="number"
                    name="amount"
                    value={formData.amount || 0}
                    onChange={handleChange}
                />
            }/>
            <RenderRow label="Payment Method" value={
                <input
                    type="text"
                    name="paymentMethod"
                    value={formData.paymentMethod || ''}
                    onChange={handleChange}
                />
            }/>
            <RenderSelect
                label="Payment Status"
                options={paymentStatusOptions}
                value={formData.paymentStatus || 'pending'}
                onChange={handleChange}
                isLoading={isLoading}
            />

            <Button type="submit" variant="primary">{initialData ? 'Сохранить' : 'Создать'}</Button>
            <Button type="button" variant="secondary" onClick={() => handleCancelClick()}>Отменить</Button>
        </form>
    );
};

export default PaymentForm;