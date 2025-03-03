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
                userId: initialData.user_id || '',
                subscriptionType: initialData.subscription_type || 'daily',
                price: initialData.price || 0,
                startDate: formatDate(initialData?.start_date!).date || '',
                endDate: formatDate(initialData.end_date!).date || '',
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
                label={t('form.subscriptionType')}
                options={subscriptionTypeOptions}
                value={formData.subscriptionType || 'daily'}
                name={"subscriptionType"}
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
                name="startDate"
                value={formData.startDate || ''}
                onChange={handleChange}
                type="date"
                isLoading={isLoading}
            />
            <RenderInput
                label={t('form.endDate')}
                name="endDate"
                value={formData.endDate || ''}
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