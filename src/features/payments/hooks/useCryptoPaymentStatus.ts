import { useFetchByType } from '@shared/api/useFetchByType';
import { cryptoPaymentConfig } from '@entities/payment';

export const useCryptoPaymentStatus = (paymentId: string) => {
    const { fetchedData, loading, error, loadData } = useFetchByType(cryptoPaymentConfig);

    return {
        data: fetchedData?.checkStatus,
        loading,
        error,
        refetch: loadData
    };
}; 