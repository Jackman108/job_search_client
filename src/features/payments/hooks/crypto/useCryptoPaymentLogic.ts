import { useEntityFetch, useTableLogic } from '@hooks';
import { ACTION_TYPES } from '@config';
import { cryptoPaymentConfig } from '@entities/payment/config/cryptoPaymentConfig';
import { CryptoPaymentDetails } from '@entities/payment/types/crypto.types';
import { useCallback, useState } from 'react';

/**
 * Хук для CRUD-операций с криптоплатежами
 */
export const useCryptoPaymentLogic = () => {
    const [cryptoPaymentDetails, setCryptoPaymentDetails] = useState<CryptoPaymentDetails | null>(null);

    const {
        data: cryptoData,
        loading: cryptoLoading,
        error: cryptoError,
        formData: cryptoFormData,
        isEditing: cryptoIsEditing,
        showForm: cryptoShowForm,
        handleEditClick: cryptoEditClick,
        handleFormSubmit: cryptoFormSubmit,
        handleDelete: cryptoDelete,
        handleToggleForm: cryptoToggleForm,
        handleCancelAction,
        loadData: reloadCryptoPayments,
    } = useTableLogic<CryptoPaymentDetails>(
        cryptoPaymentConfig,
        useEntityFetch,
        ACTION_TYPES.CRYPTO
    );


    /** Обновляет детали криптоплатежа и перезагружает список */
    const updateCryptoPaymentDetails = useCallback((details: CryptoPaymentDetails) => {
        setCryptoPaymentDetails(details);
        reloadCryptoPayments();
    }, [reloadCryptoPayments]);

    const cryptoCancel = useCallback(() => {
        if (cryptoFormData.id) {
            handleCancelAction(cryptoFormData.id);
            reloadCryptoPayments();

        }
    }, [cryptoFormData.id, handleCancelAction, reloadCryptoPayments]);

    return {
        cryptoData,
        cryptoLoading,
        cryptoError,
        cryptoFormData,
        cryptoIsEditing,
        cryptoShowForm,
        cryptoEditClick,
        cryptoFormSubmit,
        cryptoDelete,
        cryptoToggleForm,
        cryptoCancel,
        reloadCryptoPayments,
        cryptoPaymentDetails,
        setCryptoPaymentDetails,
        updateCryptoPaymentDetails,
    };
}; 