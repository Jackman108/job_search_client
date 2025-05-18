import React, {FC} from 'react';
import styles from './SubscriptionUser.module.css';
import {Button, FormContainer, LoadingOrError} from "@ui";
import {useTranslation} from "react-i18next";
import SubscriptionSelectionForm
    from "@features/subscription/ui/user/SubscriptionSelectionForm/SubscriptionSelectionForm";
import PaymentSelectionForm from "@features/payments/ui/user/PaymentSelectionForm/PaymentSelectionForm";
import {useSubscriptionLogic} from "@features/subscription/hooks/useSubscriptionLogic";
import {usePaymentLogic} from "@features/payments/hooks";
import SubscriptionActive from "@features/subscription/ui/user/SubscriptionActive/SubscriptionActive";
import {useAuth} from "@app/providers/auth/useAuthContext";
import {PanelProps} from "@type";
import CryptoSelectionForm from "@features/payments/ui/user/CryptoSelectionForm/CryptoSelectionForm";

const SubscriptionUser: FC<PanelProps> = ({onClose}) => {
    const {t} = useTranslation('subscriptions');
    // Подписочная логика
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
        subscribeSubmit,
    } = useSubscriptionLogic();
    // Платёжная логика
    const {
        paymentData,
        paymentLoading,
        paymentError,
        paymentFormData,
        paymentShowForm,
        paymentEditClick,
        paymentSubmit,
        paymentCancel,
        loadingProcess,
        errorProcess,
        cryptoPaymentDetails,
        showCryptoPayment,
        handleCloseCryptoPayment,
        updateCryptoPaymentDetails,
    } = usePaymentLogic();

    const isFormVisible = subscribeShowForm || paymentShowForm || showCryptoPayment;
    const {token} = useAuth();

    return (
        <>
            <meta name="description"
                  content="Manage your subscriptions with ease. View, edit, and delete your subscriptions in a modern and user-friendly interface."/>
            <meta name="keywords" content="subscriptions, manage subscriptions, subscription management"/>
            <meta name="author" content="Your Company"/>
            <FormContainer token={token} onClose={onClose}>
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

                    {showCryptoPayment && cryptoPaymentDetails && (
                        <div className={styles.cryptoPaymentContainer}>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCloseCryptoPayment}
                                className={styles.closeButton}
                            >
                                {t('common.back')}
                            </Button>
                            <CryptoSelectionForm
                                details={cryptoPaymentDetails}
                                onUpdate={updateCryptoPaymentDetails}
                            />
                        </div>
                    )}

                    <LoadingOrError loading={subscribeLoading} error={subscribeError} t={t}/>
                    <LoadingOrError loading={loadingProcess} error={errorProcess} t={t}/>
                    <LoadingOrError loading={paymentLoading} error={paymentError} t={t}/>
                </div>
            </FormContainer>
        </>
    );
};

export default SubscriptionUser;