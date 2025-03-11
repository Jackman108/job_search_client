import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import styles from './SubscriptionUserTable.module.css';
import {Button, LanguageSwitcher, LoadingOrError} from "@ui";
import {useTranslation} from "react-i18next";
import SubscriptionUserForm from "@features/subscription/ui/user/SubscriptionUserForm/SubscriptionUserForm";
import SubscriptionUserTableBody
    from "@features/subscription/ui/user/SubscriptionUserTableBody/SubscriptionUserTableBody";
import PaymentUserForm from "@features/payments/ui/user/PaymentUserForm/PaymentUserForm";
import {useSubscriptionLogic} from "@features/subscription/hooks/useSubscriptionLogic";

const SubscriptionUserTable: FC = () => {
    const {t} = useTranslation('subscriptions');
    const {
        selectedSubscription,
        subscribeData,
        subscribeLoading,
        subscribeError,
        subscribeFormData,
        subscribeIsEditing,
        subscribeShowForm,
        subscribeDelete,
        subscribeToggleForm,
        subscribeEditClick,
        subscribeCancel,
        paymentCancel,
        handleSubscriptionSubmit,
        paymentData,
        paymentLoading,
        paymentError,
        paymentFormData,
        paymentShowForm,
        handlePaymentClick,
        paymentSubmit,
    } = useSubscriptionLogic();


    return (
        <div className={styles.containerSubscription}>
            <LanguageSwitcher/>
            <Link to="/" className={styles.homeButton}>🏠</Link>
            <h1 className={styles.title}>{t('subscriptions.title')}</h1>

            {subscribeData && subscribeData.length > 0 ? (
                <SubscriptionUserTableBody
                    subscriptionData={subscribeData}
                    paymentData={paymentData}
                    subscribeEditClick={subscribeEditClick}
                    subscribeDelete={subscribeDelete}
                    handlePaymentClick={handlePaymentClick}
                />
            ) : (
                <Button type="button" variant="primary" onClick={subscribeToggleForm}>
                    {t('subscriptions.addSubscription')}
                </Button>
            )}

            {(subscribeShowForm || subscribeIsEditing.subscription) && (
                <SubscriptionUserForm
                    initialData={subscribeFormData}
                    onSubmit={handleSubscriptionSubmit}
                    handleCancelClick={subscribeCancel}
                    isLoading={subscribeLoading}
                    isEditing={subscribeIsEditing.subscription}
                />
            )}
            {subscribeData && paymentShowForm && selectedSubscription && (
                <PaymentUserForm
                    initialData={
                        paymentFormData ||
                        {
                            subscription_id: selectedSubscription.id,
                            amount: selectedSubscription.price,
                        }}
                    onSubmit={paymentSubmit}
                    handleCancelClick={paymentCancel}
                    isLoading={paymentLoading}
                />
            )}
            <LoadingOrError loading={subscribeLoading} error={subscribeError} t={t}/>
            <LoadingOrError loading={paymentLoading} error={paymentError} t={t} className="custom-loading-error"/>
        </div>
    );
};

export default SubscriptionUserTable;