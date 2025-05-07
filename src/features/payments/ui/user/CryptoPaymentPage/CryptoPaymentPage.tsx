import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CryptoPaymentDetails from '@features/payments/ui/user/CryptoPaymentDetails/CryptoPaymentDetails';
import { CryptoPaymentDetails as CryptoDetails } from '@entities/payment/types/CryptoPayment.types';
import { PAYMENT_STATUS } from '@entities/payment';
import { useCryptoPaymentStatus } from '@features/payments/hooks/useCryptoPaymentStatus';
import styles from './CryptoPaymentPage.module.css';

const MAX_RETRIES = 3;

const CryptoPaymentPage: React.FC = () => {
    const { t } = useTranslation('payments');
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentDetails, setPaymentDetails] = useState<CryptoDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    
    const { data: statusData, error: statusError } = useCryptoPaymentStatus(paymentDetails?.paymentId || '');

    useEffect(() => {
        const details = location.state?.details;
        if (!details) {
            setError(t('crypto.error'));
            setNotification({ message: t('crypto.error'), type: 'error' });
            return;
        }
        setPaymentDetails(details);
    }, [location.state, t]);

    useEffect(() => {
        if (statusError) {
            console.error('Error checking payment status:', statusError);
            setRetryCount(prev => prev + 1);
            
            if (retryCount >= MAX_RETRIES) {
                setNotification({ message: t('common.error'), type: 'error' });
                setError(t('common.error'));
            }
        } else if (statusData?.status) {
            if (statusData.status === PAYMENT_STATUS.COMPLETED) {
                setNotification({ message: t('crypto.success'), type: 'success' });
                navigate('/payment/success');
            } else if (statusData.status === PAYMENT_STATUS.FAILED) {
                setNotification({ message: t('crypto.error'), type: 'error' });
                navigate('/payment/error');
            } else if (statusData.status === PAYMENT_STATUS.EXPIRED) {
                setNotification({ message: t('crypto.expired'), type: 'error' });
                navigate('/payment/error');
            }
        }
    }, [statusData, statusError, retryCount, navigate, t]);

    if (error) {
        return (
            <div className={styles.error}>
                <h3>{t('common.error')}</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!paymentDetails) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>{t('common.loading')}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {notification && (
                <div className={`${styles.notification} ${styles[notification.type]}`}>
                    {notification.message}
                </div>
            )}
            <CryptoPaymentDetails details={paymentDetails} />
        </div>
    );
};

export default CryptoPaymentPage; 