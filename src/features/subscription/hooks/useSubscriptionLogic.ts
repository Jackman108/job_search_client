import {useCallback, useEffect, useMemo, useState} from 'react';
import {ACTION_TYPES} from "@config";
import {useTableLogic} from "@hooks/useTableLogic";
import {SubscriptionItem} from "@features/subscription/types/Subscription.types";
import {subscriptionConfig} from "@features/subscription/config/subscriptionConfig";
import useFetchSubscription from "@features/subscription/hooks/useFetchSubscription";
import {PaymentItem} from "@features/payments/types/Payment.types";
import useFetchPayment from "@features/payments/hooks/useFetchPayment";
import {paymentConfig} from "@features/payments/config/paymentConfig";
import {useProcessHandler} from "@features/payments/hooks/useProcessHandler";

export const useSubscriptionLogic = () => {
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionItem | null>(null);
    const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);

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
        handleCancelAction: cancelSubscription,
    } = subscriptionLogic;

    const {
        data: paymentData,
        loading: paymentLoading,
        error: paymentError,
        showForm: paymentShowForm,
        handleToggleForm: paymentToggleForm,
        handleFormSubmit: handlePaymentSubmit,
        handleCancelAction: cancelPayment
    } = paymentLogic;

    const {handleProcess, loadingProcess, errorProcess} = useProcessHandler();

    const handlePaymentSubmitWithProcess = useCallback(async (formData: Partial<PaymentItem>) => {
        if (!formData) return;
        try {
            await handlePaymentSubmit(formData);

            setIsPaymentSubmitted(true);
        } catch (error) {
            console.error('Ошибка при создании платежа:', error);
        }
    }, [handlePaymentSubmit]);


    const handleEditSubscription = useCallback((type: string, item: any) => {
        handleEditClick(type, item);
        subscriptionToggleForm();
    }, [handleEditClick, subscriptionToggleForm]);

    const handlePaymentClick = useCallback((subscription: SubscriptionItem) => {
        setSelectedSubscription(subscription);
        paymentToggleForm();
    }, [paymentToggleForm]);


    const latestPayment = useMemo(() => {
        if (paymentData && paymentData.length > 0) {
            return paymentData[paymentData.length - 1];
        }
        return null;
    }, [paymentData]);

    useEffect(() => {
        if (isPaymentSubmitted && latestPayment) {
            handleProcess(latestPayment)
                .then(() => {
                    setIsPaymentSubmitted(false);
                })
                .catch((error) => {
                    console.error('Ошибка при обработке платежа:', error);
                });
        }
    }, [isPaymentSubmitted, latestPayment, handleProcess]);

    return {
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
        handleCancelSubscription: cancelSubscription,
        handleCancelPayment: cancelPayment,
        paymentData,
        paymentLoading,
        paymentError,
        paymentShowForm,
        paymentToggleForm,
        handlePaymentClick,
        handlePaymentSubmit: handlePaymentSubmitWithProcess,
        loadingProcess,
        errorProcess,
    };
};