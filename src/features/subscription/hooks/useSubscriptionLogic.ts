import { useCallback } from 'react';
import { ACTION_TYPES } from "@config";
import { useTableLogic } from "@hooks";
import { useEntityFetch } from '@hooks';
import { PAYMENT_STATUS } from "@entities/payment";
import { subscriptionConfig, SubscriptionTypes } from "@entities/subscription";
import { usePaymentLogic } from "@features/payments/hooks";

export const useSubscriptionLogic = () => {
    // Для создания платежа по умолчанию
    const { createPayment } = usePaymentLogic();

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

    // Создание платежа по умолчанию
    const createDefaultPayment = useCallback(async (subscription: SubscriptionTypes) => {
        try {
            await createPayment({
                subscription_id: subscription.id,
                amount: subscription.price,
                payment_status: PAYMENT_STATUS.PENDING,
            });
        } catch (error) {
            console.error('Ошибка при создании платежа по умолчанию:', error);
        }
    }, [createPayment]);

    // Создание подписки с последующим платежом
    const subscriptionWithPayment = useCallback(async (formData: Partial<SubscriptionTypes>) => {
        try {
            const createdSubscription = await subscribeSubmit(formData);
            const subscriptionToUse = subscribeIsEditing.subscription ? formData : createdSubscription.data;
            if (subscriptionToUse) {
                await createDefaultPayment(subscriptionToUse);
            }
        } catch (error) {
            console.error('Ошибка при создании подписки или оплаты:', error);
        }
    }, [subscribeSubmit, createDefaultPayment, subscribeIsEditing.subscription]);

    // Открытие формы редактирования подписки
    const subscribeEditClick = useCallback((type: string, item: any) => {
        subscribeEdit(type, item);
        subscribeToggleForm();
    }, [subscribeEdit, subscribeToggleForm]);

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