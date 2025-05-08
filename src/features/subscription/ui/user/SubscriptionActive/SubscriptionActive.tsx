import React from 'react';
import {Button} from "@ui";
import {useTranslation} from "react-i18next";
import {formatDate} from "@utils";
import {getSubscriptionStatus} from "@features/subscription/utils/getSubscriptionStatus";
import styles from './SubscriptionActive.module.css';
import {SUBSCRIPTION_TYPE_OPTIONS, SubscriptionTypes} from "@entities/subscription";
import {PAYMENT_STATUS, BasePayment} from "@entities/payment";
import {useSubscriptionStatus} from "@features/subscription/hooks/useSubscriptionStatus";
import {useCurrency} from "@hooks";
import {ACTION_TYPES} from "@config";
import {getCardBackground} from "@features/subscription/utils/getCardBackground";

interface SubscriptionActiveCardProps {
    subscribeData: SubscriptionTypes[];
    paymentData: BasePayment[];
    subscribeEditClick: (action: string, subscribe: SubscriptionTypes) => void;
    subscribeDelete: (id: string) => void;
    paymentEditClick?: (id: string, payment: BasePayment) => void;
}

const SubscriptionActive: React.FC<SubscriptionActiveCardProps> = ({
                                                                       subscribeData,
                                                                       paymentData,
                                                                       subscribeEditClick,
                                                                       paymentEditClick,
                                                                   }) => {
    const {t} = useTranslation('subscriptions');
    const {currency, convertCurrency} = useCurrency();
    const {getSubscriptionLabel} = useSubscriptionStatus();
    const latestPayment = paymentData?.find((payment: BasePayment) => payment.payment_status === PAYMENT_STATUS.PENDING);

    const renderActions = (subscribe: SubscriptionTypes) => {
        return (
            <div className={styles.actions}>
                {!latestPayment && (
                    <Button onClick={() => subscribeEditClick(ACTION_TYPES.SUBSCRIPTION, subscribe)}>
                        {t('subscriptions.extendSubscription')}
                    </Button>
                )}
                {latestPayment && (
                    <Button onClick={() => paymentEditClick!(latestPayment.id!, latestPayment)}>
                        {t('subscriptions.actions.pay')}
                    </Button>
                )}
            </div>
        );
    };

    return (
        <section className={styles.cardContainer}>
            {subscribeData?.map((subscribe) => (
                <article
                    key={subscribe.id}
                    className={styles.card}
                    style={getCardBackground(subscribe.subscription_type)}
                >
                    <div className={styles.cardHeader}>
                        <h2>{getSubscriptionLabel(subscribe.subscription_type, SUBSCRIPTION_TYPE_OPTIONS)}</h2>
                        <span className={styles.status}>
                                {t(`subscriptions.status.${getSubscriptionStatus(subscribe, paymentData)}`)}
                            </span>
                    </div>
                    <div className={styles.cardBody}>
                        <p>
                            <strong>{t('tableHeaders.price')}: </strong>
                            {convertCurrency(subscribe.price, 'RUB', currency)} {currency}
                        </p>
                        <p>
                            <strong>{t('tableHeaders.startDate')}: </strong>
                            {formatDate(subscribe.start_date.toString()).date}
                        </p>
                        <p>
                            <strong>{t('tableHeaders.endDate')}: </strong>
                            {formatDate(subscribe.end_date.toString()).date}
                        </p>
                    </div>
                    {renderActions(subscribe)}
                </article>
            ))}
        </section>
    );
};

export default SubscriptionActive;