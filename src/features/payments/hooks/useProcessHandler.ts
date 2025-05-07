//import { useNavigate } from 'react-router-dom';
import { PAYMENT_STATUS, paymentConfig, paymentProcessConfig, PaymentTypes } from "@entities/payment";
import { useFetchByType, usePostByType } from "@api";
import { ACTION_TYPES } from '@config';
import { WebPayResponse } from "@entities/payment/types/WebPayResponse.types";
import { CryptoPaymentDetails } from "@entities/payment/types/CryptoPayment.types";
import { mockWebPayResponse } from "@entities/payment/mock/mockWebPayResponse";
import { mockCryptoResponse } from "@entities/payment/mock/mockCryptoResponse";
import { cryptoPaymentConfig } from "@entities/payment/config/cryptoPaymentConfig";

export const useProcessHandler = () => {
    //const navigate = useNavigate();
    const {
        saveItem: processRequest,
        loading: loadingProcess,
        error: errorProcess,
    } = usePostByType(paymentProcessConfig);

    const {
        saveItem: cryptoProcessRequest,
        loading: loadingCryptoProcess,
        error: errorCryptoProcess,
    } = usePostByType(cryptoPaymentConfig);

    const { saveItem: updatePaymentStatus } = useFetchByType(paymentConfig);

    const handleProcess = async (paymentData: PaymentTypes) => {
        if (!paymentData || !paymentData.id) {
            console.error('Payment data or payment ID is missing');
            return;
        }

        const paymentSystem = paymentData.payment_method as keyof typeof paymentProcessConfig;

        const handleProcessSuccess = async (response: WebPayResponse | CryptoPaymentDetails) => {
            try {
                await updatePaymentStatus({
                    type: ACTION_TYPES.PAYMENT,
                    id: paymentData.id,
                    formData: {
                        payment_status: PAYMENT_STATUS.COMPLETED,
                        payment_method: paymentData.payment_method,
                        amount: paymentData.amount,
                        updated_at: new Date()
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
                    formData: {
                        payment_status: PAYMENT_STATUS.FAILED,
                        payment_method: paymentData.payment_method,
                        amount: paymentData.amount,
                    },
                    isEditing: true,
                });
                //navigate('/payment/error');
            } catch (error) {
                console.error('Failed to update payment status to "failed":', error);
                //navigate('/payment/error');
            }
        };

        try {
            let response: WebPayResponse | CryptoPaymentDetails;
            
            if (process.env.NODE_ENV === 'development') {
                response = paymentSystem === 'crypto' ? mockCryptoResponse : mockWebPayResponse;
                
                if (paymentSystem === 'crypto' && 'cryptoAddress' in response) {
                    // В dev режиме обновляем статус в таблице payments
                    await updatePaymentStatus({
                        type: ACTION_TYPES.PAYMENT,
                        id: paymentData.id,
                        formData: {
                            payment_status: PAYMENT_STATUS.PENDING,
                            payment_method: paymentData.payment_method,
                            amount: paymentData.amount,
                            updated_at: new Date()
                        },
                        isEditing: true,
                    });

                    // В dev режиме создаем запись в crypto_payments используя моковые данные
                    await cryptoProcessRequest({
                        type: 'createPayment',
                        formData: {
                            id: paymentData.id,
                            subscription_id: paymentData.subscription_id,
                            amount: paymentData.amount,
                            currency: response.currency,
                            network: response.network,
                            crypto_address: response.cryptoAddress,
                            crypto_amount: response.cryptoAmount,
                            status: response.status,
                            created_at: response.createdAt,
                            expires_at: response.expiresAt,
                            transaction_hash: response.transactionHash,
                            wallet_provider: 'default'
                        },
                        isEditing: false,
                    });

                    // Имитируем успешную оплату
                    await handleProcessSuccess(response);
                    return response;
                }
            } else {
                // В продакшене сначала создаем запись в payments
                await updatePaymentStatus({
                    type: ACTION_TYPES.PAYMENT,
                    id: paymentData.id,
                    formData: {
                        payment_status: PAYMENT_STATUS.PENDING,
                        payment_method: paymentData.payment_method,
                        amount: paymentData.amount,
                        updated_at: new Date()
                    },
                    isEditing: true,
                });

                // Затем делаем запрос к API для создания криптоплатежа
                response = await processRequest({
                    type: paymentSystem,
                    formData: {
                        id: paymentData.id,
                        subscription_id: paymentData.subscription_id,
                        amount: paymentData.amount,
                        currency: 'BTC', // или другая валюта по умолчанию
                        network: 'BTC', // или другая сеть по умолчанию
                        payment_status: PAYMENT_STATUS.PENDING
                    },
                    isEditing: false,
                }) as WebPayResponse | CryptoPaymentDetails;
            }

            if (paymentSystem === 'crypto') {
                // Проверяем, что это действительно криптоплатеж
                if ('cryptoAddress' in response) {
                    // Проверяем статус платежа
                    const statusResponse = await cryptoProcessRequest({
                        type: 'checkStatus',
                        formData: {
                            paymentId: response.paymentId,
                            status: response.status,
                            confirmations: response.confirmations,
                            transactionHash: response.transactionHash
                        },
                        isEditing: false,
                    });

                    if (statusResponse?.status === PAYMENT_STATUS.COMPLETED) {
                        await handleProcessSuccess(response);
                    }
                }

                return response;
            } else if ('page' in response && response.page === "success") {
                await handleProcessSuccess(response);
            } else {
                await handleProcessFailure();
            }
        } catch (error) {
            await handleProcessFailure();
            throw error;
        }
    };

    return {
        handleProcess,
        loadingProcess: loadingProcess || loadingCryptoProcess,
        errorProcess: errorProcess || errorCryptoProcess,
    };
};