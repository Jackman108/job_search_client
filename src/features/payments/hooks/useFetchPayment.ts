import {PaymentItem} from '../types/Payment.types';
import {useFetchByType} from "@api";
import {QueryConfigProps} from "@type";

const useFetchPayment = (config: QueryConfigProps['config']) => {
    const {fetchedData, loading, error, saveItem, deleteItem, loadData} = useFetchByType(config);
    const data = fetchedData?.payment as PaymentItem[] || [];

    return {
        data,
        loading,
        error,
        saveItem,
        deleteItem,
        loadData
    };
};

export default useFetchPayment;
