import { SubscriptionTypes } from "@entities/subscription";
import { BasePayment, PAYMENT_STATUS } from "@entities/payment";

export const getSubscriptionStatus = (
    subscription: SubscriptionTypes,
    payments: BasePayment[]
): string => {
    const currentDate = new Date();
    const subscriptionEndDate = new Date(subscription.end_date);

    const isActive = subscriptionEndDate > currentDate;

    const hasPendingPayment = payments.some(
        payment => payment.subscription_id === subscription.id && payment.payment_status === PAYMENT_STATUS.PENDING
    );
    const hasSuccessfulPayment = payments.some(
        payment => payment.subscription_id === subscription.id && payment.payment_status === PAYMENT_STATUS.COMPLETED
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