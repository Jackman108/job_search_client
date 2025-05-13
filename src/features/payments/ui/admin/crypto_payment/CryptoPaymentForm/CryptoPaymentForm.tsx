import React, { useEffect } from 'react';
import { SUPPORTED_CRYPTO_NETWORKS } from '@entities/payment/config/cryptoPaymentConfig';
import { CryptoPaymentDetails } from '@entities/payment';
import { Button, RenderInput, RenderSelect } from '@ui';
import { useFormState } from '@hooks';
import { useTranslation } from 'react-i18next';
import styles from './CryptoPaymentForm.module.css';
import { CryptoPaymentFormProps } from '@entities/payment/types/components.types';


const CryptoPaymentForm: React.FC<CryptoPaymentFormProps> = ({ initialData, onSubmit, handleCancelClick, isLoading }) => {
    const { t } = useTranslation('cryptoPayments');
    const { formData, setFormData } = useFormState<Partial<CryptoPaymentDetails>>();

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                subscription_id: initialData.subscription_id,
                network: initialData.network,
                crypto_address: initialData.crypto_address,
                crypto_amount: initialData.crypto_amount,
            });
        }
    }, [initialData, setFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <RenderSelect
                label={t('form.network')}
                options={SUPPORTED_CRYPTO_NETWORKS.map(net => ({ value: net.value, label: net.label }))}
                name="network"
                value={formData.network || ''}
                onChange={handleChange}
                isLoading={isLoading}
            />
            <RenderInput
                label={t('form.cryptoAddress')}
                name="crypto_address"
                value={formData.crypto_address || ''}
                onChange={handleChange}
                type="text"
                isLoading={isLoading}
            />
            <RenderInput
                label={t('form.cryptoAmount')}
                name="crypto_amount"
                value={formData.crypto_amount || ''}
                onChange={handleChange}
                type="text"
                isLoading={isLoading}
            />
            <div className={styles.buttons}>
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {initialData ? t('form.save') : t('form.create')}
                </Button>
                <Button type="button" variant="secondary" onClick={() => handleCancelClick(formData.id)} disabled={isLoading}>
                    {t('form.cancel')}
                </Button>
            </div>
        </form>
    );
};

export default CryptoPaymentForm; 