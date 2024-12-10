import {Payment} from '../../Interfaces/interfacePayment.types';
import {useFetchById} from "./useFetchById";
import {datPaymentConfig} from "../../config/paymentConfig";


const useFetchPayment = () => {

    const { fetchedData, loading, error } = useFetchById(datPaymentConfig.payment);

    return {
        paymentData: fetchedData as Payment[],
        loading,
        error,
    };
};

export default useFetchPayment;
