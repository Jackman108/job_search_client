import {SubscriptionItem} from '../types/Subscription.types';
import {subscriptionConfig} from "@features/subscription/config/subscriptionConfig";
import {useFetchByType} from "@hooks/useFetchByType";

const useFetchSubscription = () => {

    const {fetchedData, loading, error} = useFetchByType(subscriptionConfig.subscription);

    return {
        subscriptionData: fetchedData as SubscriptionItem[],
        loading,
        error,
    };
};

export default useFetchSubscription;
