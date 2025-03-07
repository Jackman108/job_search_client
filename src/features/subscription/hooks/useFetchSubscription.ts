import {SubscriptionItem} from '../types/Subscription.types';
import {useFetchByType} from "@hooks/useFetchByType";
import {QueryConfigProps} from "@features/resume/types/InterfaceResume.types";

const useFetchSubscription = (config: QueryConfigProps['config']) => {

    const {fetchedData, loading, error, saveItem, deleteItem} = useFetchByType(config);
    const data = fetchedData?.subscription as SubscriptionItem[] || [];

    return {data, loading, error, saveItem, deleteItem};
};

export default useFetchSubscription;
