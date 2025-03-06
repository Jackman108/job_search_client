import React, {useEffect} from 'react';
import {SubscriptionFormProps, SubscriptionItem} from '../../types/Subscription.types';
import {useFormState} from "@features/resume/hooks/useFormState";
import Button from "@ui/Button/Button";
import RenderSelect from "@ui/RenderSelect/RenderSelect";
import {subscriptionTypeOptions} from "@features/subscription/config/subscriptionConfig";
import {useTranslation} from 'react-i18next';
import RenderInput from "@ui/RenderInput/RenderInput";
import {formatDate} from "@utils/formatUtils";

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({initialData, onSubmit, handleCancelClick, isLoading}) => {
    const {formData, setFormData} = useFormState<Partial<SubscriptionItem>>();
    const {t} = useTranslation('subscriptions');

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                user_id: initialData.user_id || '',
                subscription_type: initialData.subscription_type || 'daily',
                price: initialData.price || 0,
                start_date: initialData?.start_date! || '',
                end_date: initialData.end_date! || '',
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
                label={t('form.subscriptionType')}
                options={subscriptionTypeOptions}
                value={formData.subscription_type || 'daily'}
                name="subscription_type"
                onChange={handleChange}
                isLoading={isLoading}
            />
            <RenderInput
                label={t('form.price')}
                name="price"
                value={formData.price || 0}
                onChange={handleChange}
                type="number"
                isLoading={isLoading}
            />
            <RenderInput
                label={t('form.startDate')}
                name="start_date"
                value={formatDate(formData.start_date).date || ''}

                onChange={handleChange}
                type="date"
                isLoading={isLoading}
            />
            <RenderInput
                label={t('form.endDate')}
                name="end_date"
                value={formatDate(formData.end_date).date || ''}
                onChange={handleChange}
                type="date"
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

export default SubscriptionForm;