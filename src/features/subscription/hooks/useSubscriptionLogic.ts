import {useCallback, useState} from 'react';
import {ACTION_TYPES} from "@config";
import {useTableLogic} from "@hooks";
import useFetchSubscription from "@features/subscription/hooks/useFetchSubscription";
import {PAYMENT_METHOD, PAYMENT_STATUS, paymentConfig, PaymentTypes} from "@entities/payment";
import useFetchPayment from "@features/payments/hooks/useFetchPayment";
import {useProcessHandler} from "@features/payments/hooks/useProcessHandler";
import {subscriptionConfig, SubscriptionTypes} from "@entities/subscription";
import {CryptoPaymentDetails} from "@entities/payment/types/CryptoPayment.types";

export const useSubscriptionLogic = () => {
    const [cryptoPaymentDetails, setCryptoPaymentDetails] = useState<CryptoPaymentDetails | null>(null);
    const [showCryptoPayment, setShowCryptoPayment] = useState(false);

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
                if (updatedPayment.payment_method === PAYMENT_METHOD.CRYPTO) {
                    try {
                        const response = await handleProcess(updatedPayment);
                        if (response && 'crypto_address' in response) {
                            setCryptoPaymentDetails(response);
                            setShowCryptoPayment(true);
                            paymentToggleForm();
                        }
                    } catch (error: any) {
                        // If error is about duplicate key, try to fetch existing payment
                        if (error?.message?.includes('duplicate key')) {
                            const existingPayment = await handleProcess({
                                ...updatedPayment,
                                payment_status: 'getExistingPayment'
                            });
                            if (existingPayment && 'crypto_address' in existingPayment) {
                                setCryptoPaymentDetails(existingPayment);
                                setShowCryptoPayment(true);
                                paymentToggleForm();
                            }
                        } else {
                            throw error;
                        }
                    }
                } else {
                    await handleProcess(updatedPayment);
                    paymentToggleForm();
                }
            } else {
                console.error('Нет платежа со статусом PENDING для обработки');
            }
        } catch (error) {
            console.error('Ошибка при создании оплаты:', error);
        }
    }, [paymentData, handleProcess, paymentToggleForm]);

    const handleCloseCryptoPayment = useCallback(() => {
        setShowCryptoPayment(false);
        setCryptoPaymentDetails(null);
    }, []);

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
        cryptoPaymentDetails,
        showCryptoPayment,
        handleCloseCryptoPayment,
    };
};