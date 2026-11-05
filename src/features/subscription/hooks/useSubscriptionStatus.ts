import {useCallback} from 'react';
import {BasePayment} from "@entities/payment";

export const useSubscriptionStatus = () => {
    const getPaymentStatuses = useCallback((subscriptionId: string, paymentData: BasePayment[]) => {
        return paymentData
            .filter(payment => payment.subscription_id === subscriptionId)
            .map(payment => payment.payment_status)
            .join(', ');
    }, []);

    const getSubscriptionLabel = useCallback((subscriptionType: string, subscriptionTypeOptions: any[]) => {
        const option = subscriptionTypeOptions.find(option => option.value === subscriptionType);
        return option ? option.label : subscriptionType;
    }, []);

    return {
        getPaymentStatuses,
        getSubscriptionLabel,
    };
};