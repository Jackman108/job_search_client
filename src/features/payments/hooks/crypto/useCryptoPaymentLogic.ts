import { useEntityFetch, useTableLogic } from '@hooks';
import { ACTION_TYPES } from '@config';
import { cryptoPaymentConfig } from '@entities/payment/config/cryptoPaymentConfig';
import { CryptoPaymentDetails } from '@entities/payment/types/crypto.types';

/**
 * Хук для CRUD-операций с криптоплатежами
 */
export const useCryptoPaymentLogic = () => {
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
        handleCancelAction: cryptoCancel,
        loadData: reloadCryptoPayments,
    } = useTableLogic<CryptoPaymentDetails>(
        cryptoPaymentConfig,
        useEntityFetch,
        ACTION_TYPES.CRYPTO
    );

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
    };
}; 