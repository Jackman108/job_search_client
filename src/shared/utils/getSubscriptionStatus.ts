import {SubscriptionTypes} from "@entities/subscription";
import {PaymentTypes} from "@entities/payment";

export const getSubscriptionStatus = (
    subscription: SubscriptionTypes,
    payments: PaymentTypes[]
): string => {
    const currentDate = new Date();
    const subscriptionEndDate = new Date(subscription.end_date);

    const isActive = subscriptionEndDate > currentDate;

    const hasPendingPayment = payments.some(
        payment => payment.subscription_id === subscription.id && payment.payment_status === 'pending'
    );
    const hasSuccessfulPayment = payments.some(
        payment => payment.subscription_id === subscription.id && payment.payment_status === 'completed'
    );
    if (isActive && hasPendingPayment) {
        return 'extended_unpaid';
    } else if (isActive && hasSuccessfulPayment) {
        return 'active';
    } else if (!isActive) {
        return 'expired';
    } else {
        return 'unknown';
    }
};