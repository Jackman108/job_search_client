import {Payment} from '../../Interfaces/interfacePayment.types';
import {datPaymentConfig} from "../../config/paymentConfig";
import {useFetchByType} from "./useFetchByType";


const useFetchPayment = () => {

    const {fetchedData, loading, error} = useFetchByType(datPaymentConfig.payment);

    return {
        paymentData: fetchedData as Payment[],
        loading,
        error,
    };
};

export default useFetchPayment;
