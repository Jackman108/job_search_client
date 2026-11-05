import { useCallback, useEffect } from 'react';
import { useFormState } from '@hooks';
import { PAYMENT_METHOD, PAYMENT_STATUS, BasePayment } from '@entities/payment';
import { PaymentFormProps, UsePaymentFormReturn } from '@entities/payment';

/**
 * Хук для управления формой выбора способа оплаты
 * @param initialData - Начальные данные формы
 * @param onSubmit - Функция обработки отправки формы
 * @param handleCancelClick - Функция обработки отмены
 * @param isLoading - Флаг загрузки
 * @returns Объект с данными формы и обработчиками событий
 */
export const usePaymentForm = ({
    initialData,
    onSubmit,
    handleCancelClick,
    isLoading = false
}: PaymentFormProps): UsePaymentFormReturn => {
    const { formData, setFormData } = useFormState<Partial<BasePayment>>();

    /**
     * Инициализация формы начальными данными
     */
    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                subscription_id: initialData.subscription_id,
                amount: initialData.amount || 0,
                payment_status: initialData.payment_status || PAYMENT_STATUS.PENDING,
                payment_method: initialData.payment_method || PAYMENT_METHOD.WEBPAY
            });
        } else {
            setFormData({
                payment_method: PAYMENT_METHOD.WEBPAY
            });
        }
    }, [initialData, setFormData]);

    /**
     * Обработчик изменения полей формы
     */
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, [setFormData]);

    /**
     * Обработчик отправки формы
     */
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    }, [formData, onSubmit]);

    /**
     * Обработчик отмены
     */
    const handleCancel = useCallback(() => {
        if (formData.id) {
            handleCancelClick(formData.id);
        }
    }, [formData.id, handleCancelClick]);

    return {
        formData,
        handleChange,
        handleSubmit,
        handleCancel,
        isLoading
    };
}; 