import {Payment} from '../types/Payment.types';
import {useFetchByType} from "@hooks/useFetchByType";
import {ResumeConfigProps} from "@features/resume/types/InterfaceResume.types";

const useFetchPayment = (config: ResumeConfigProps['config']) => {
    const {fetchedData, loading, error, saveItem, deleteItem} = useFetchByType(config);
    const data = fetchedData?.payment as Payment[] || [];

    return {
        data,
        loading,
        error,
        saveItem,
        deleteItem
    };
};

export default useFetchPayment;
