import {PaymentItem} from '../types/Payment.types';
import {useFetchByType} from "@hooks/useFetchByType";
import {QueryConfigProps} from "@features/resume/types/InterfaceResume.types";

const useFetchPayment = (config: QueryConfigProps['config']) => {
    const {fetchedData, loading, error, saveItem, deleteItem} = useFetchByType(config);
    const data = fetchedData?.payment as PaymentItem[] || [];

    return {
        data,
        loading,
        error,
        saveItem,
        deleteItem
    };
};

export default useFetchPayment;
