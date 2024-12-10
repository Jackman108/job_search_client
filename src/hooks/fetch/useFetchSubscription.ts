import { Subscription } from '../../Interfaces/interfaceSubscription.types';
import {useFetchById} from "./useFetchById";
import {dateSubscriptionConfig} from "../../config/subscriptionConfig";

const useFetchSubscription = () => {

    const { fetchedData, loading, error } = useFetchById(dateSubscriptionConfig.subscription);

    return {
        subscriptionData: fetchedData as Subscription[],
        loading,
        error,
    };
};

export default useFetchSubscription;
