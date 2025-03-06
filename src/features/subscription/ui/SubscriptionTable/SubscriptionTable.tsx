import React from 'react';
import {Link} from 'react-router-dom';
import styles from './SubscriptionTable.module.css';
import {ACTION_TYPES} from "@config/actionTypes";
import SubscriptionForm from "@features/subscription/ui/SubscriptionForm/SubscriptionForm";
import LanguageSwitcher from "@ui/LanguageSwitcher/LanguageSwitcher";
import SubscriptionTableBody from "@features/subscription/ui/SubscriptionTableBody/SubscriptionTableBody";
import {useTranslation} from "react-i18next";
import {useTableLogic} from "@hooks/useTableLogic";
import {SubscriptionItem} from "@features/subscription/types/Subscription.types";
import {subscriptionConfig} from "@features/subscription/config/subscriptionConfig";
import useFetchSubscription from "@features/subscription/hooks/useFetchSubscription";

const SubscriptionTable = () => {
    const {t} = useTranslation('subscriptions');
    const {
        data: subscriptionData,
        loading,
        error,
        formData,
        isEditing,
        showForm,
        handleEditClick,
        handleDelete,
        handleFormSubmit,
        handleToggleForm,
        handleCancelClick,
    } = useTableLogic<SubscriptionItem>(subscriptionConfig, useFetchSubscription, ACTION_TYPES.SUBSCRIPTION);

    return (
        <div className={styles.container}>
            <LanguageSwitcher/>
            <Link to="/" className="home-button">🏠</Link>
            <h1>{t('subscriptions.title')}</h1>

            <button onClick={handleToggleForm}>
                {showForm ? t('subscriptions.hideForm') : t('subscriptions.addSubscription')}
            </button>
            {(showForm || isEditing[ACTION_TYPES.SUBSCRIPTION]) && (
                <SubscriptionForm
                    initialData={formData}
                    onSubmit={handleFormSubmit}
                    handleCancelClick={() => {
                        handleCancelClick(ACTION_TYPES.SUBSCRIPTION);
                        handleToggleForm();
                    }}
                    isLoading={loading}
                />
            )}
            {loading && <p>{t('common.loading')}</p>}
            {error && <p>{t('common.error')}: {error.message}</p>}
            {subscriptionData && subscriptionData.length > 0 ? (
                <SubscriptionTableBody
                    subscriptionData={subscriptionData}
                    handleEditClick={(type, item) => {
                        handleEditClick(type, item);
                        handleToggleForm();
                    }}
                    handleDelete={handleDelete}
                />
            ) : (
                !loading && !error && <p>{t('subscriptions.noData')}</p>
            )}
        </div>
    );
};

export default SubscriptionTable;