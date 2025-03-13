import React, {FC} from 'react';
import styles from './SubscriptionUser.module.css';
import {Button, LoadingOrError} from "@ui";
import {useTranslation} from "react-i18next";
import SubscriptionSelectionForm
    from "@features/subscription/ui/user/SubscriptionSelectionForm/SubscriptionSelectionForm";
import PaymentSelectionForm from "@features/payments/ui/user/PaymentSelectionForm/PaymentSelectionForm";
import {useSubscriptionLogic} from "@features/subscription/hooks/useSubscriptionLogic";
import SubscriptionActive from "@features/subscription/ui/user/SubscriptionActive/SubscriptionActive";


const SubscriptionUser: FC = () => {
    const {t} = useTranslation('subscriptions');
    const {
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
        subscribeSubmit,
        paymentData,
        paymentLoading,
        paymentError,
        paymentFormData,
        paymentShowForm,
        paymentEditClick,
        paymentSubmit,
        loadingProcess,
        errorProcess,
    } = useSubscriptionLogic();

    const isFormVisible = subscribeShowForm || paymentShowForm;
    return (
        <>
            <meta name="description"
                  content="Manage your subscriptions with ease. View, edit, and delete your subscriptions in a modern and user-friendly interface."/>
            <meta name="keywords" content="subscriptions, manage subscriptions, subscription management"/>
            <meta name="author" content="Your Company"/>
            <title>Subscription Management</title>
            <div className={styles.containerSubscription}>
                <h1 className={styles.title}>{t('subscriptions.title')}</h1>

                {!isFormVisible && subscribeData && subscribeData.length > 0 && (
                    <SubscriptionActive
                        subscribeData={subscribeData}
                        paymentData={paymentData}
                        subscribeEditClick={subscribeEditClick}
                        subscribeDelete={subscribeDelete}
                        paymentEditClick={paymentEditClick}
                    />
                )}

                {!isFormVisible && (!subscribeData || subscribeData.length === 0) && (
                    <Button type="button" variant="primary" onClick={subscribeToggleForm}>
                        {t('subscriptions.addSubscription')}
                    </Button>
                )}

                {subscribeShowForm && (
                    <SubscriptionSelectionForm
                        initialData={subscribeFormData}
                        onSubmit={subscribeSubmit}
                        handleCancelClick={subscribeCancel}
                        isLoading={subscribeLoading}
                        isEditing={subscribeIsEditing.subscription}
                    />
                )}

                {paymentShowForm && (
                    <PaymentSelectionForm
                        initialData={paymentFormData}
                        onSubmit={paymentSubmit}
                        handleCancelClick={paymentCancel}
                        isLoading={paymentLoading}
                    />
                )}

                <LoadingOrError loading={subscribeLoading} error={subscribeError} t={t}/>
                <LoadingOrError loading={loadingProcess} error={errorProcess} t={t}/>
                <LoadingOrError loading={paymentLoading} error={paymentError} t={t}/>
            </div>
        </>
    );
};
export default SubscriptionUser;