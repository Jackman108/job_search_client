//import {useNavigate} from 'react-router-dom';
import {mockWebPayResponse, PAYMENT_STATUS, paymentConfig, paymentProcessConfig, PaymentTypes} from "@entities/payment";
import {useFetchByType, usePostByType} from "@api";
import {ACTION_TYPES} from '@config';
import {WebPayResponse} from "@entities/payment/types/WebPayResponse.types";

export const useProcessHandler = () => {
    //const navigate = useNavigate();

    const {
        saveItem: processRequest,
        loading: loadingProcess,
        error: errorProcess,
    } = usePostByType(paymentProcessConfig);

    const {saveItem: updatePaymentStatus} = useFetchByType(paymentConfig);


    const handleProcess = async (paymentData: PaymentTypes) => {
        if (!paymentData || !paymentData.id) {
            console.error('Payment data or payment ID is missing');
            return;
        }

        const paymentSystem = paymentData.payment_method as keyof typeof paymentProcessConfig;


        const handleProcessSuccess = async (response: WebPayResponse) => {

            try {
                await updatePaymentStatus({
                    type: ACTION_TYPES.PAYMENT,
                    id: paymentData.id,
                    formData: {
                        payment_status: PAYMENT_STATUS.COMPLETED,
                        updated_at: response.invoice_date
                    },
                    isEditing: true,
                });
                //navigate('/payment/success');
            } catch (error) {
                console.error('Failed to update payment status to "completed":', error);
                //navigate('/payment/error');
            }
        };

        const handleProcessFailure = async () => {
            try {
                await updatePaymentStatus({
                    type: ACTION_TYPES.PAYMENT,
                    id: paymentData.id,
                    formData: {payment_status: PAYMENT_STATUS.FAILED},
                    isEditing: true,
                });
                //navigate('/payment/error');
            } catch (error) {
                console.error('Failed to update payment status to "failed":', error);
                //navigate('/payment/error');
            }
        };

        try {
            let response: WebPayResponse;
            if (process.env.NODE_ENV === 'development') {
                response = mockWebPayResponse;
                console.log("PAY")
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