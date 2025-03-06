import React from 'react';
import Button from "@ui/Button/Button";
import {ACTION_TYPES} from "@config/actionTypes";
import {useTranslation} from "react-i18next";
import {useCurrency} from "@hooks/useCurrency";
import {SubscriptionTableBodyProps} from "@features/subscription/types/Subscription.types";
import {formatDate} from "@utils/formatUtils";
import {subscriptionTypeOptions} from "@features/subscription/config/subscriptionConfig";

const SubscriptionUserTableBody: React.FC<SubscriptionTableBodyProps> = ({
                                                                             subscriptionData,
                                                                             paymentData,
                                                                             handleEditClick,
                                                                             handleDelete,
                                                                             handlePaymentClick
                                                                         }) => {
    const {t} = useTranslation('subscriptions')
    const {currency, convertCurrency} = useCurrency();
    const getSubscriptionLabel = (subscriptionType: string) => {
        const option = subscriptionTypeOptions.find(option => option.value === subscriptionType);
        return option ? option.label : subscriptionType;
    };
    return (
        <table>
            <thead>
            <tr>
                <th>{t('tableHeaders.id')}</th>
                <th>{t('tableHeaders.subscriptionType')}</th>
                <th>{t('tableHeaders.price')}</th>
                <th>{t('tableHeaders.startDate')}</th>
                <th>{t('tableHeaders.endDate')}</th>
                <th>{t('tableHeaders.actions')}</th>
            </tr>
            </thead>
            <tbody>
            {subscriptionData?.map(subscription => (
                <tr key={subscription.id}>
                    <td>{subscription.id}</td>
                    <td>{getSubscriptionLabel(subscription.subscription_type)}</td>
                    <td>{convertCurrency(subscription.price!, 'RUB', currency)} {currency}</td>
                    <td>{formatDate(subscription.start_date!.toString()).date}</td>
                    <td>{formatDate(subscription.end_date!.toString()).date}</td>

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