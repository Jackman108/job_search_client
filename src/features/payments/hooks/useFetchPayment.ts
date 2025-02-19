import {Payment} from '../types/Payment.types';
import {paymentConfig} from "../config/paymentConfig";
import {useFetchByType} from "@hooks/useFetchByType";

const useFetchPayment = () => {

    const {fetchedData, loading, error} = useFetchByType(paymentConfig.payment);

    return {
        paymentData: fetchedData as Payment[],
        loading,
        error,
    };
};

export default useFetchPayment;
