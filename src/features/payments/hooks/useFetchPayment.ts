import {BasePayment} from "@entities/payment";     
import {useFetchByType} from "@api";
import {QueryConfigProps} from "@type";

const useFetchPayment = (config: QueryConfigProps['config']) => {
    const {fetchedData, loading, error, saveItem, deleteItem, loadData} = useFetchByType(config);
    const data = fetchedData?.payment as BasePayment[] || [];

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
