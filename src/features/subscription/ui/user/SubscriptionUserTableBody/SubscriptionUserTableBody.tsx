import React from 'react';
import {Button} from "@ui";
import {ACTION_TYPES} from "@config";
import {useTranslation} from "react-i18next";
import {useCurrency} from "@hooks";
import {SubscriptionTableBodyProps} from "@features/subscription/props/Subscription.props";
import {formatDate, getSubscriptionStatus} from "@utils";
import styles from './SubscriptionUserTableBody.module.css';
import {useSubscriptionStatus} from "@features/subscription/hooks/useSubscriptionStatus";
import {SUBSCRIPTION_TYPE_OPTIONS} from "@entities/subscription";

const SubscriptionUserTableBody: React.FC<SubscriptionTableBodyProps> = ({
                                                                             subscriptionData,
                                                                             paymentData = [],
                                                                             handleEditClick,
                                                                             handleDelete,
                                                                             handlePaymentClick
                                                                         }) => {
    const {t} = useTranslation('subscriptions')
    const {currency, convertCurrency} = useCurrency();
    const {getPaymentStatuses, getSubscriptionLabel} = useSubscriptionStatus();

    return (
        <table className={styles.table}>
            <thead>
            <tr>
                <th>{t('tableHeaders.subscriptionType')}</th>
                <th>{t('tableHeaders.price')}</th>
                <th>{t('tableHeaders.startDate')}</th>
                <th>{t('tableHeaders.endDate')}</th>
                <th>{t('tableHeaders.paymentStatus')}</th>
                <th>{t('tableHeaders.subscriptionStatus')}</th>
                <th>{t('tableHeaders.actions')}</th>
            </tr>
            </thead>
            <tbody>
            {subscriptionData?.map(subscription => (
                <tr key={subscription.id}>
                    <td>{getSubscriptionLabel(subscription.subscription_type, SUBSCRIPTION_TYPE_OPTIONS)}</td>
                    <td>{convertCurrency(subscription.price!, 'RUB', currency)} {currency}</td>
                    <td>{formatDate(subscription.start_date!.toString()).date}</td>
                    <td>{formatDate(subscription.end_date!.toString()).date}</td>
                    <td>{getPaymentStatuses(subscription.id!, paymentData)}</td>
                    <td>
                        {t(`subscriptions.status.${getSubscriptionStatus(subscription, paymentData)}`)}

                    </td>

                    <td>
                        <Button onClick={() => handleEditClick(ACTION_TYPES.SUBSCRIPTION, subscription)}>
                            {t('subscriptions.extendSubscription')}
                        </Button>
                        <Button onClick={() => handleDelete(subscription.id!)}>
                            {t('subscriptions.actions.delete')}
                        </Button>
                        <Button onClick={() => handlePaymentClick!(subscription)}>
                            {t('subscriptions.actions.pay')}
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default SubscriptionUserTableBody;