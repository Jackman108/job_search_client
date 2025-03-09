import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import styles from './SubscriptionUserTable.module.css';
import {ACTION_TYPES} from "@config";
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
        subscriptionData,
        subscriptionLoading,
        subscriptionError,
        subscriptionFormData,
        isEditing,
        subscriptionShowForm,
        handleDelete,
        handleSubscriptionSubmit,
        subscriptionToggleForm,
        handleEditSubscription,
        handleCancelSubscription,
        handleCancelPayment,
        paymentData,
        paymentLoading,
        paymentError,
        paymentShowForm,
        handlePaymentClick,
        handlePaymentSubmit,
    } = useSubscriptionLogic();


    return (
        <div className={styles.containerSubscription}>
            <LanguageSwitcher/>
            <Link to="/" className="home-button">🏠</Link>
            <h1>{t('subscriptions.title')}</h1>

            {subscriptionData && subscriptionData.length > 0 ? (
                <SubscriptionUserTableBody
                    subscriptionData={subscriptionData}
                    paymentData={paymentData}
                    handleEditClick={handleEditSubscription}
                    handleDelete={handleDelete}
                    handlePaymentClick={handlePaymentClick}
                />
            ) : (
                <Button type="button" variant="primary" onClick={subscriptionToggleForm}>
                    {t('subscriptions.addSubscription')}
                </Button>
            )}

            {(subscriptionShowForm || isEditing[ACTION_TYPES.SUBSCRIPTION]) && (
                <SubscriptionUserForm
                    initialData={subscriptionFormData}
                    onSubmit={handleSubscriptionSubmit}
                    handleCancelClick={handleCancelSubscription}
                    isLoading={subscriptionLoading}
                    isEditing={isEditing[ACTION_TYPES.SUBSCRIPTION]}
                />
            )}
            {paymentShowForm && selectedSubscription && (
                <PaymentUserForm
                    initialData={{
                        subscription_id: selectedSubscription.id,
                        amount: selectedSubscription.price,
                    }}
                    onSubmit={handlePaymentSubmit}
                    handleCancelClick={handleCancelPayment}
                    isLoading={paymentLoading}
                />
            )}
            <LoadingOrError loading={subscriptionLoading} error={subscriptionError} t={t}/>
            <LoadingOrError loading={paymentLoading} error={paymentError} t={t} className="custom-loading-error"/>
        </div>
    );
};

export default SubscriptionUserTable;