import {useCallback} from 'react';
import {ACTION_TYPES} from "@config";
import {useTableLogic} from "@hooks";
import useFetchSubscription from "@features/subscription/hooks/useFetchSubscription";
import {PAYMENT_STATUS, paymentConfig, PaymentTypes} from "@entities/payment";
import useFetchPayment from "@features/payments/hooks/useFetchPayment";
import {useProcessHandler} from "@features/payments/hooks/useProcessHandler";
import {subscriptionConfig, SubscriptionTypes} from "@entities/subscription";

export const useSubscriptionLogic = () => {

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
        handleEditClick: paymentEdit,
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


    const paymentWithProcess = useCallback(async (formData: Partial<PaymentTypes>) => {
        try {
            const latestPayment: PaymentTypes = paymentData?.find((payment: PaymentTypes) => payment.payment_status === PAYMENT_STATUS.PENDING);

            if (latestPayment) {
                const updatedPayment = {
                    ...latestPayment,
                    payment_method: formData.payment_method,
                    amount: formData?.amount || latestPayment.amount
                };

                await handleProcess(updatedPayment);
            } else {
                console.error('Нет платежа со статусом PENDING для обработки');
            }
            paymentToggleForm();
        } catch (error) {
            console.error('Ошибка при создании оплаты:', error);
        }
    }, [paymentData, handleProcess, paymentToggleForm]);


    const subscribeEditClick = useCallback((type: string, item: any) => {
        subscribeEdit(type, item);
        subscribeToggleForm();
    }, [subscribeEdit, subscribeToggleForm]);

    const paymentEditClick = useCallback((type: string, item: any) => {
        paymentEdit(type, item);
        paymentToggleForm();
    }, [paymentToggleForm, paymentEdit]);


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
        paymentFormData,
        paymentsIsEditing,
        paymentCancel,
        paymentData,
        paymentLoading,
        paymentError,
        paymentShowForm,
        paymentToggleForm,
        paymentEditClick,
        paymentSubmit: paymentWithProcess,
        loadingProcess,
        errorProcess,
    };
};