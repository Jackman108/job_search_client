import {SubscriptionItem} from '../types/Subscription.types';
import {useFetchByType} from "@api";
import {QueryConfigProps} from "@type";

const useFetchSubscription = (config: QueryConfigProps['config']) => {

    const {fetchedData, loading, error, saveItem, deleteItem} = useFetchByType(config);
    const data = fetchedData?.subscription as SubscriptionItem[] || [];

    return {data, loading, error, saveItem, deleteItem};
};

export default useFetchSubscription;
