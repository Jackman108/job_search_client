import { useCallback } from 'react';
import { ACTION_TYPES } from '@config';
import { useTableLogic, useEntityFetch } from '@hooks';
import { BasePayment, PAYMENT_STATUS, paymentConfig } from '@entities/payment';
import { subscriptionConfig, SubscriptionTypes } from '@entities/subscription';

export const useSubscriptionLogic = () => {
    // Default pending payment via entity config — no payments-feature import
    const { handleFormSubmit: createPayment } = useTableLogic<BasePayment>(
        paymentConfig,
        useEntityFetch,
        ACTION_TYPES.PAYMENT,
    );

    const {
        data: subscribeData,
        loading: subscribeLoading,
        error: subscribeError,
        formData: subscribeFormData,
        isEditing: subscribeIsEditing,
        showForm: subscribeShowForm,
        handleEditClick: subscribeEdit,
        handleDelete: subscribeDelete,
        handleFormSubmit: subscribeSubmit,
        handleToggleForm: subscribeToggleForm,
        handleCancelAction: subscribeCancel,
    } = useTableLogic<SubscriptionTypes>(subscriptionConfig, useEntityFetch, ACTION_TYPES.SUBSCRIPTION);

    const createDefaultPayment = useCallback(
        async (subscription: SubscriptionTypes) => {
            try {
                await createPayment({
                    subscription_id: subscription.id,
                    amount: subscription.price,
                    payment_status: PAYMENT_STATUS.PENDING,
                });
            } catch (error) {
                console.error('Ошибка при создании платежа по умолчанию:', error);
            }
        },
        [createPayment],
    );

    const subscriptionWithPayment = useCallback(
        async (formData: Partial<SubscriptionTypes>) => {
            try {
                const createdSubscription = await subscribeSubmit(formData);
                const subscriptionToUse = subscribeIsEditing.subscription ? formData : createdSubscription.data;
                if (subscriptionToUse) {
                    await createDefaultPayment(subscriptionToUse);
                }
            } catch (error) {
                console.error('Ошибка при создании подписки или оплаты:', error);
            }
        },
        [subscribeSubmit, createDefaultPayment, subscribeIsEditing.subscription],
    );

    const subscribeEditClick = useCallback(
        (type: string, item: any) => {
            subscribeEdit(type, item);
            subscribeToggleForm();
        },
        [subscribeEdit, subscribeToggleForm],
    );

    return {
        subscribeData,
        subscribeLoading,
        subscribeError,
        subscribeFormData,
        subscribeIsEditing,
        subscribeShowForm,
        subscribeDelete,
        subscribeSubmit: subscriptionWithPayment,
        subscribeToggleForm,
        subscribeEditClick,
        subscribeCancel,
    };
};
