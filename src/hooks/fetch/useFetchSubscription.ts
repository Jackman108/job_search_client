import {Subscription} from '../../Interfaces/interfaceSubscription.types';
import {dateSubscriptionConfig} from "../../config/subscriptionConfig";
import {useFetchByType} from "./useFetchByType";

const useFetchSubscription = () => {

    const {fetchedData, loading, error} = useFetchByType(dateSubscriptionConfig.subscription);

    return {
        subscriptionData: fetchedData as Subscription[],
        loading,
        error,
    };
};

export default useFetchSubscription;
