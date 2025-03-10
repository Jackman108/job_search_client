import {useFetchByType} from "@api";
import {QueryConfigProps} from "@type";
import {SubscriptionTypes} from "@entities/subscription";

const useFetchSubscription = (config: QueryConfigProps['config']) => {

    const {fetchedData, loading, error, saveItem, deleteItem} = useFetchByType(config);
    const data = fetchedData?.subscription as SubscriptionTypes[] || [];

    return {data, loading, error, saveItem, deleteItem};
};

export default useFetchSubscription;
