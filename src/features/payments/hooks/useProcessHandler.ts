import {useNavigate} from 'react-router-dom';
import {PaymentItem} from '@features/payments/types/Payment.types';
import {useFetchByType} from "@api";
import {ACTION_TYPES} from '@config';
import {paymentConfig, paymentSystemsConfig} from '@features/payments/config/paymentConfig';
import {usePostByType} from "@api";
import {mockWebPayResponse} from "@features/payments/config/mockWebPayResponse";
import {WebPayResponse} from "@features/payments/types/WebPayResponse.types";

export const useProcessHandler = () => {
    const navigate = useNavigate();

    const {
        saveItem: processRequest,
        loading: loadingProcess,
        error: errorProcess,
    } = usePostByType(paymentSystemsConfig);

    const {saveItem: updatePaymentStatus} = useFetchByType(paymentConfig);


    const handleProcess = async (paymentData: PaymentItem) => {
        if (!paymentData || !paymentData.id) {
            console.error('Payment data or payment ID is missing');
            return;
        }

        const paymentSystem = paymentData.payment_method as keyof typeof paymentSystemsConfig;

        const handleProcessSuccess = async (response: WebPayResponse) => {
            try {
                await updatePaymentStatus({
                    type: ACTION_TYPES.PAYMENT,
                    id: paymentData.id,
                    formData: {
                        payment_status: 'completed',
                        updated_at: response.invoice_date
                    },
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
            let response: WebPayResponse;
            if (process.env.NODE_ENV === 'development') {
                response = mockWebPayResponse;
            } else {
                response = await processRequest({
                    type: paymentSystem,
                    formData: paymentData,
                    isEditing: false,
                }) as WebPayResponse;
            }
            if (response.page === "success") {
                await handleProcessSuccess(response);
            } else {
                await handleProcessFailure();
            }
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