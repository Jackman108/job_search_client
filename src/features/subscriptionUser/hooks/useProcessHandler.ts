import {useNavigate} from 'react-router-dom';
import {PaymentItem} from '@features/payments/types/Payment.types';
import {useFetchByType} from '@hooks/useFetchByType';
import {ACTION_TYPES} from '@config/actionTypes';
import {paymentConfig, paymentSystemsConfig} from '@features/payments/config/paymentConfig';
import {usePostByType} from "@features/subscriptionUser/hooks/usePostByType";

export const useProcessHandler = () => {
    const navigate = useNavigate();

    const {
        saveItem: processRequest,
        loading: loadingProcess,
        error: errorProcess,
    } = usePostByType(paymentSystemsConfig);

    const {saveItem: updatePaymentStatus} = useFetchByType(paymentConfig);


    const handleProcess = async (paymentData: PaymentItem) => {
        if (!paymentData) return;

        const paymentSystem = paymentData.payment_method as keyof typeof paymentSystemsConfig;

        const handleProcessSuccess = async () => {
            try {
                await updatePaymentStatus({
                    type: ACTION_TYPES.PAYMENT,
                    id: paymentData.id,
                    formData: {payment_status: 'completed'},
                    isEditing: true,
                });
                navigate('/payment/success');
            } catch (error) {
                console.error('Failed to update payment status to "completed":', error);
                navigate('/payment/error');
            }
        };

        const handleProcessFailure = async () => {
            try {
                await updatePaymentStatus({
                    type: ACTION_TYPES.PAYMENT,
                    id: paymentData.id,
                    formData: {payment_status: 'failed'},
                    isEditing: true,
                });
                navigate('/payment/error');
            } catch (error) {
                console.error('Failed to update payment status to "failed":', error);
                navigate('/payment/error');
            }
        };

        try {
            await processRequest({
                type: paymentSystem,
                formData: paymentData,
                isEditing: false,
            });
            await handleProcessSuccess();
        } catch (error) {
            await handleProcessFailure();
        }
    };

    return {
        handleProcess,
        loadingProcess,
        errorProcess,
    };
};