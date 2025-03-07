import {useCallback, useEffect, useState} from 'react';
import {ACTION_TYPES} from "@config/actionTypes";
import {useTableLogic} from "@hooks/useTableLogic";
import {SubscriptionItem} from "@features/subscription/types/Subscription.types";
import {subscriptionConfig} from "@features/subscription/config/subscriptionConfig";
import useFetchSubscription from "@features/subscription/hooks/useFetchSubscription";
import {PaymentItem} from "@features/payments/types/Payment.types";
import useFetchPayment from "@features/payments/hooks/useFetchPayment";
import {paymentConfig} from "@features/payments/config/paymentConfig";
import {useProcessHandler} from "@features/subscriptionUser/hooks/useProcessHandler";

export const useSubscriptionLogic = () => {
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionItem | null>(null);

    const subscriptionLogic = useTableLogic<SubscriptionItem>(
        subscriptionConfig, useFetchSubscription, ACTION_TYPES.SUBSCRIPTION
    );

    const paymentLogic = useTableLogic<PaymentItem>(
        paymentConfig, useFetchPayment, ACTION_TYPES.PAYMENT
    );

    const {
        data: subscriptionData,
        loading: subscriptionLoading,
        error: subscriptionError,
        formData: subscriptionFormData,
        isEditing,
        showForm: subscriptionShowForm,
        handleEditClick,
        handleDelete,
        handleFormSubmit: handleSubscriptionSubmit,
        handleToggleForm: subscriptionToggleForm,
        handleCancelClick,
    } = subscriptionLogic;

    const {
        data: paymentData,
        loading: paymentLoading,
        error: paymentError,
        showForm: paymentShowForm,
        handleToggleForm: paymentToggleForm,
        handleFormSubmit: handlePaymentSubmit,
    } = paymentLogic;

    const {
        handleProcess,
        loadingProcess,
        errorProcess,
    } = useProcessHandler();


    const handlePaymentSubmitWithProcess = useCallback(async (formData: Partial<PaymentItem>) => {
        if (!formData) return;
        try {
            await handlePaymentSubmit(formData);


            await handleProcess(formData as PaymentItem);

        } catch (error) {
            console.error('Ошибка при создании платежа:', error);
        }
    }, [handlePaymentSubmit, handleProcess]);


    const handlePaymentClick = useCallback((subscription: SubscriptionItem) => {
        setSelectedSubscription(subscription);
        paymentToggleForm();
    }, [paymentToggleForm]);


    useEffect(() => {
        if (subscriptionData && subscriptionData.length > 0 && !isEditing[ACTION_TYPES.SUBSCRIPTION]) {
            const latestSubscription = subscriptionData[subscriptionData.length - 1];
            setSelectedSubscription(latestSubscription);
            paymentToggleForm();

        }
    }, [subscriptionData, isEditing, paymentToggleForm, paymentData]);

    return {
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
        handlePaymentSubmitWithProcess,
        loadingProcess,
        errorProcess,
    };
};