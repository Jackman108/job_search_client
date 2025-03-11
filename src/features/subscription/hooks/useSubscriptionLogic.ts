import {useCallback, useEffect, useState} from 'react';
import {ACTION_TYPES} from "@config";
import {useTableLogic} from "@hooks";
import useFetchSubscription from "@features/subscription/hooks/useFetchSubscription";
import {PAYMENT_STATUS, paymentConfig, PaymentTypes} from "@entities/payment";
import useFetchPayment from "@features/payments/hooks/useFetchPayment";
import {useProcessHandler} from "@features/payments/hooks/useProcessHandler";
import {subscriptionConfig, SubscriptionTypes} from "@entities/subscription";

export const useSubscriptionLogic = () => {
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionTypes | null>(null);

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
    } = useTableLogic<SubscriptionTypes>(subscriptionConfig, useFetchSubscription, ACTION_TYPES.SUBSCRIPTION);

    const {
        data: paymentData,
        loading: paymentLoading,
        error: paymentError,
        formData: paymentFormData,
        isEditing: paymentsIsEditing,
        showForm: paymentShowForm,
        handleToggleForm: paymentToggleForm,
        handleFormSubmit: paymentSubmit,
        handleCancelAction: paymentCancel
    } = useTableLogic<PaymentTypes>(paymentConfig, useFetchPayment, ACTION_TYPES.PAYMENT);


    const {handleProcess, loadingProcess, errorProcess} = useProcessHandler();

    const createDefaultPayment = useCallback(async (subscription: SubscriptionTypes) => {
        try {
            await paymentSubmit({
                subscription_id: subscription.id,
                amount: subscription.price,
                payment_status: PAYMENT_STATUS.PENDING,
            });
        } catch (error) {
            console.error('Ошибка при создании платежа по умолчанию:', error);
        }
    }, [paymentSubmit]);


    const handleSubscriptionSubmitWithPayment = useCallback(async (formData: Partial<SubscriptionTypes>) => {
        try {
            const createdSubscription = await subscribeSubmit(formData);
            if (selectedSubscription) {
                await createDefaultPayment(selectedSubscription);
            } else if (createdSubscription.data) {
                await createDefaultPayment(createdSubscription.data);
            }
        } catch (error) {
            console.error('Ошибка при создании подписки или оплаты:', error);
        }
    }, [subscribeSubmit, createDefaultPayment, selectedSubscription]);


    const handlePaymentSubmitWithProcess = useCallback(async (formData: Partial<PaymentTypes>) => {
        try {
            const latestPayment = paymentData?.find((payment: PaymentTypes) => payment.payment_status === PAYMENT_STATUS.PENDING);

            if (latestPayment) {
                const updatedPayment = {
                    ...formData,
                    ...latestPayment,

                };
                await handleProcess(updatedPayment);
                console.log('Процесс оплаты успешно завершён');
            } else {
                console.error('Нет платежа со статусом PENDING для обработки');
            }
            paymentToggleForm();
        } catch (error) {
            console.error('Ошибка при создании платежа:', error);
        }
    }, [paymentData, handleProcess, paymentToggleForm]);


    const subscribeEditClick = useCallback((type: string, item: any) => {
        subscribeEdit(type, item);
        subscribeToggleForm();
    }, [subscribeEdit, subscribeToggleForm]);

    const handlePaymentClick = useCallback((subscription: SubscriptionTypes) => {
        setSelectedSubscription(subscription);
        paymentToggleForm();
    }, [paymentToggleForm]);


    useEffect(() => {
        if (subscribeData && subscribeData.length > 0 && !subscribeIsEditing.subscription) {
            const latestSubscription = subscribeData[subscribeData.length - 1];
            setSelectedSubscription(latestSubscription);
        }
    }, [subscribeData, subscribeIsEditing.subscription]);

    return {
        selectedSubscription,
        subscribeData,
        subscribeLoading,
        subscribeError,
        subscribeFormData,
        subscribeIsEditing,
        subscribeShowForm,
        subscribeDelete,
        handleSubscriptionSubmit: handleSubscriptionSubmitWithPayment,
        subscribeToggleForm,
        subscribeEditClick,
        subscribeCancel,
        paymentFormData,
        paymentsIsEditing,
        paymentCancel,
        paymentData,
        paymentLoading,
        paymentError,
        paymentShowForm,
        paymentToggleForm,
        handlePaymentClick,
        paymentSubmit: handlePaymentSubmitWithProcess,
        loadingProcess,
        errorProcess,
    };
};