import React from 'react';
import {Link} from 'react-router-dom';
import styles from './SubscriptionTable.module.css';
import SubscriptionForm from "@features/subscription/ui/admin/SubscriptionForm/SubscriptionForm";
import {LanguageSwitcher} from "@ui";
import SubscriptionTableBody from "@features/subscription/ui/admin/SubscriptionTableBody/SubscriptionTableBody";
import {useTranslation} from "react-i18next";
import { ACTION_TYPES } from "@config";
import {useSubscriptionLogic} from "@features/subscription/hooks/useSubscriptionLogic";

const SubscriptionTable = () => {
    const {t} = useTranslation('subscriptions');
    const {
        subscribeData,
        subscribeLoading,
        subscribeError,
        subscribeFormData,
        subscribeIsEditing,
        subscribeShowForm,
        subscribeEditClick,
        subscribeDelete,
        subscribeSubmit,
        subscribeToggleForm,
        subscribeCancel,
    } = useSubscriptionLogic();

    return (
        <div className={styles.container}>
            <LanguageSwitcher/>
            <Link to="/" className="home-button">🏠</Link>
            <h1>{t('subscriptions.title')}</h1>

            <button onClick={subscribeToggleForm}>
                {subscribeShowForm ? t('subscriptions.hideForm') : t('subscriptions.addSubscription')}
            </button>
            {(subscribeShowForm || subscribeIsEditing[ACTION_TYPES.SUBSCRIPTION]) && (
                <SubscriptionForm
                    initialData={subscribeFormData}
                    onSubmit={subscribeSubmit}
                    handleCancelClick={subscribeCancel}
                    isLoading={subscribeLoading}
                />
            )}
            {subscribeLoading && <p>{t('common.loading')}</p>}
            {subscribeError && <p>{t('common.error')}: {subscribeError.message}</p>}
            {subscribeData && subscribeData.length > 0 ? (
                <SubscriptionTableBody
                    subscriptionData={subscribeData}
                    subscribeEditClick={subscribeEditClick}
                    subscribeDelete={subscribeDelete}
                />
            ) : (
                !subscribeLoading && !subscribeError && <p>{t('subscriptions.noData')}</p>
            )}
        </div>
    );
};

export default SubscriptionTable;