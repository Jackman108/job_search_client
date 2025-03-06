import React, {useEffect} from 'react';
import {SubscriptionFormProps, SubscriptionItem} from '../../subscription/types/Subscription.types';
import {useFormState} from "@features/resume/hooks/useFormState";
import Button from "@ui/Button/Button";
import RenderSelect from "@ui/RenderSelect/RenderSelect";
import {subscriptionTypeOptions} from "@features/subscription/config/subscriptionConfig";
import {useTranslation} from 'react-i18next';
import RenderRow from "@ui/RenderRow/RenderRow";

const SubscriptionUserForm: React.FC<SubscriptionFormProps> = ({
                                                                   initialData,
                                                                   onSubmit,
                                                                   handleCancelClick,
                                                                   isLoading,
                                                                   isEditing
                                                               }) => {
    const {formData, setFormData} = useFormState<Partial<SubscriptionItem>>();
    const {t} = useTranslation('subscriptions');

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                subscription_type: initialData.subscription_type || subscriptionTypeOptions[0].value,
                price: initialData.price || 3
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
        <>
            <RenderRow label={t('form.price')} value={formData.price}/>
            <form onSubmit={handleSubmit}>
                <RenderSelect
                    label={t('form.subscriptionType')}
                    options={subscriptionTypeOptions}
                    value={formData.subscription_type}
                    name="subscription_type"
                    onChange={handleChange}
                    isLoading={isLoading}
                />
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isEditing ? t('form.update') : t('form.create')}
                </Button>
                <Button type="button" variant="secondary" onClick={handleCancelClick} disabled={isLoading}>
                    {t('form.cancel')}
                </Button>
            </form>
        </>
    );
};

export default SubscriptionUserForm;