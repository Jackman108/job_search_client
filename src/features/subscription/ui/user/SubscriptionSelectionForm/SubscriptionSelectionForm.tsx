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
import styles from './SubscriptionSelectionForm.module.css';
import SubscriptionOption from "@features/subscription/ui/user/SubscriptionOption/SubscriptionOption";

const SubscriptionSelectionForm: React.FC<SubscriptionFormProps> = ({
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
        <section aria-labelledby="subscription-form-title" className={styles.formContainer}>
            <h2 id="subscription-form-title" className={styles.formTitle}>
                {isEditing ? t('cardHeaders.editSubscription') : t('cardHeaders.createSubscription')}
            </h2>
            <form onSubmit={handleSubmit} className={styles.form} aria-describedby="subscription-form-description">
                <p id="subscription-form-description" className={styles.formDescription}>
                    {t('cardHeaders.chooseSubscriptionType')}
                </p>
                <div className={styles.cardContainer} role="group" aria-label="Subscription options">
                    {SUBSCRIPTION_TYPE_OPTIONS.map(option => (
                        <SubscriptionOption
                            key={option.value}
                            label={option.label}
                            price={option.price}
                            currency="RUB"
                            isSelected={selectedType === option.value}
                            onClick={() => handleCardClick(option.value, option.price)}
                            aria-label={`${option.label} subscription for ${option.price} RUB`}
                        />
                    ))}
                </div>
                <div className={styles.buttonGroup}>
                    <Button type="submit" variant="primary" disabled={isLoading}
                            aria-label={isEditing ? t('cardHeaders.update') : t('cardHeaders.create')}>
                        {isEditing ? t('cardHeaders.update') : t('cardHeaders.create')}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => handleCancelClick(formData.id)}
                            disabled={isLoading} aria-label={t('cardHeaders.cancel')}>
                        {t('cardHeaders.cancel')}
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default SubscriptionSelectionForm;