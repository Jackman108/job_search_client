import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import styles from './SubscriptionUserTable.module.css';
import {ACTION_TYPES} from "@config/actionTypes";
import LanguageSwitcher from "@ui/LanguageSwitcher/LanguageSwitcher";
import {useTranslation} from "react-i18next";
import SubscriptionUserForm from "@features/subscriptionUser/SubscriptionUserForm/SubscriptionUserForm";
import SubscriptionUserTableBody from "@features/subscriptionUser/SubscriptionUserTableBody/SubscriptionUserTableBody";
import Button from "@ui/Button/Button";
import PaymentUserForm from "@features/subscriptionUser/PaymentUserForm/PaymentUserForm";
import {useSubscriptionLogic} from "@features/subscriptionUser/hooks/useSubscriptionLogic";
import LoadingOrError from "@ui/LoadingOrError/LoadingOrError";

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
        handleEditClick,
        handleDelete,
        handleSubscriptionSubmit,
        subscriptionToggleForm,
        handleCancelClick,
        paymentData,
        paymentLoading,
        paymentError,
        paymentShowForm,
        paymentToggleForm,
        handlePaymentClick,
        handlePaymentSubmit,
    } = useSubscriptionLogic();

    return (
        <div className={styles.containerSubscription}>
            <LanguageSwitcher/>
            <Link to="/" className="home-button">🏠</Link>
            <h1>{t('subscriptions.title')}</h1>

            {subscriptionData && subscriptionData.length > 0 ? (
                <>
                    <SubscriptionUserTableBody
                        subscriptionData={subscriptionData}
                        paymentData={paymentData || []}
                        handleEditClick={(type, item) => {
                            handleEditClick(type, item);
                            subscriptionToggleForm();
                        }}
                        handleDelete={handleDelete}
                        handlePaymentClick={handlePaymentClick}
                    />
                </>
            ) : (

                <Button type="button" variant="primary" onClick={subscriptionToggleForm}>
                    {t('subscriptions.addSubscription')}
                </Button>
            )}

            {(subscriptionShowForm || isEditing[ACTION_TYPES.SUBSCRIPTION]) && (
                <SubscriptionUserForm
                    initialData={subscriptionFormData}
                    onSubmit={handleSubscriptionSubmit}
                    handleCancelClick={() => {
                        handleCancelClick(ACTION_TYPES.SUBSCRIPTION);
                        subscriptionToggleForm();
                    }}
                    isLoading={subscriptionLoading}
                    isEditing={isEditing[ACTION_TYPES.SUBSCRIPTION]}
                />
            )}
            {!paymentShowForm && selectedSubscription && (
                <PaymentUserForm
                    initialData={{
                        subscription_id: selectedSubscription.id,
                        amount: selectedSubscription.price,
                    }}
                    onSubmit={handlePaymentSubmit}
                    handleCancelClick={() => paymentToggleForm()}
                    isLoading={paymentLoading}
                />
            )}
            <LoadingOrError loading={subscriptionLoading} error={subscriptionError} t={t}/>
            <LoadingOrError loading={paymentLoading} error={paymentError} t={t} className="custom-loading-error"/>
        </div>
    );
};

export default SubscriptionUserTable;