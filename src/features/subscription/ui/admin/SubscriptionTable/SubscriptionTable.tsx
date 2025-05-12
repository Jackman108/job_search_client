import React from 'react';
import {Link} from 'react-router-dom';
import styles from './SubscriptionTable.module.css';
import {ACTION_TYPES} from "@config";
import SubscriptionForm from "@features/subscription/ui/admin/SubscriptionForm/SubscriptionForm";
import {LanguageSwitcher} from "@ui";
import SubscriptionTableBody from "@features/subscription/ui/admin/SubscriptionTableBody/SubscriptionTableBody";
import {useTranslation} from "react-i18next";
import {useEntityFetch, useTableLogic} from "@hooks";
import {subscriptionConfig, SubscriptionTypes} from "@entities/subscription";

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
        handleCancelAction,
    } = useTableLogic<SubscriptionTypes>(subscriptionConfig, useEntityFetch, ACTION_TYPES.SUBSCRIPTION);

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
                    handleCancelClick={handleCancelAction}
                    isLoading={loading}
                />
            )}
            {loading && <p>{t('common.loading')}</p>}
            {error && <p>{t('common.error')}: {error.message}</p>}
            {subscriptionData && subscriptionData.length > 0 ? (
                <SubscriptionTableBody
                    subscriptionData={subscriptionData}
                    subscribeEditClick={(type, item) => {
                        handleEditClick(type, item);
                        handleToggleForm();
                    }}
                    subscribeDelete={handleDelete}
                />
            ) : (
                !loading && !error && <p>{t('subscriptions.noData')}</p>
            )}
        </div>
    );
};

export default SubscriptionTable;