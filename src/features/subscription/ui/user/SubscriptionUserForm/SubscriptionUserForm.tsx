import React, {useCallback, useEffect, useState} from 'react';
import {SubscriptionFormProps} from '@features/subscription/props/Subscription.props';
import {useFormState} from "@hooks";
import {Button} from "@ui";
import {useTranslation} from 'react-i18next';
import {
    SUBSCRIPTION_TYPE_OPTIONS,
    SUBSCRIPTION_TYPES,
    SubscriptionTypes,
    SubscriptionVariant
} from "@entities/subscription";
import styles from './SubscriptionUserForm.module.css';
import SubscriptionCard from "@features/subscription/ui/user/SubscriptionCard/SubscriptionCard";

const SubscriptionUserForm: React.FC<SubscriptionFormProps> = ({
                                                                   initialData,
                                                                   onSubmit,
                                                                   handleCancelClick,
                                                                   isLoading,
                                                                   isEditing
                                                               }) => {
    const {formData, setFormData} = useFormState<Partial<SubscriptionTypes>>();
    const {t} = useTranslation('subscriptions');
    const [selectedType, setSelectedType] = useState<string>(initialData?.subscription_type || SUBSCRIPTION_TYPES.WEEKLY);

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                subscription_type: initialData.subscription_type || SUBSCRIPTION_TYPES.WEEKLY,
                price: initialData.price
            });
            setSelectedType(initialData.subscription_type || SUBSCRIPTION_TYPES.WEEKLY);
        }
    }, [initialData, setFormData]);

    const handleCardClick = useCallback((type: SubscriptionVariant, price: number) => {
        setSelectedType(type);
        setFormData(prev => ({...prev, subscription_type: type, price}));
    }, [setFormData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.cardContainer}>
                    {SUBSCRIPTION_TYPE_OPTIONS.map(option => (
                        <SubscriptionCard
                            key={option.value}
                            label={option.label}
                            price={option.price}
                            currency="RUB"
                            isSelected={selectedType === option.value}
                            onClick={() => handleCardClick(option.value, option.price)}
                        />
                    ))}
                </div>
                <div className={styles.buttonGroup}>
                    <Button type="submit" variant="primary" disabled={isLoading}>
                        {isEditing ? t('form.update') : t('form.create')}
                    </Button>
                    <Button type="button" variant="secondary" onClick={handleCancelClick} disabled={isLoading}>
                        {t('form.cancel')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SubscriptionUserForm;