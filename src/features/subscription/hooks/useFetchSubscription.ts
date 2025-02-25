import {SubscriptionItem} from '../types/Subscription.types';
import {subscriptionConfig} from "@features/subscription/config/subscriptionConfig";
import {useFetchByType} from "@hooks/useFetchByType";

const useFetchSubscription = () => {

    const {
        fetchedData,
        loading,
        error
    } = useFetchByType(subscriptionConfig);
    const subscriptionData = fetchedData?.subscription as SubscriptionItem[] || [];
    return {
        subscriptionData,
        loading,
        error,
    };
};

export default useFetchSubscription;
