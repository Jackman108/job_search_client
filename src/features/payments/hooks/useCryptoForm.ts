import { CRYPTO_EXCHANGE_RATES, CRYPTO_WALLET_ADDRESSES, CryptoPaymentDetails } from '@entities/payment';
import { getWalletUrl } from '@entities/payment/config/cryptoPaymentConfig';
import { cryptoPaymentConfig } from '@entities/payment/config/cryptoPaymentConfig';
import { useEntityFetch, useClipboard, useTableLogic } from '@hooks';
import { ACTION_TYPES } from '@shared/config';
import { useState, useEffect } from 'react';
import { usePaymentTimer } from './usePaymentTimer';
import { useTransactionConfirmations } from './useTransactionConfirmations';
/**
 * Hook for managing state and business logic for crypto payment details view.
 */
export const useCryptoForm = (
    details: CryptoPaymentDetails,
    onUpdate?: (updated: CryptoPaymentDetails) => void
) => {
    const [showQR, setShowQR] = useState(true);
    const [isAddressCopied, setIsAddressCopied] = useState(false);
    const [isAmountCopied, setIsAmountCopied] = useState(false);
    const [expiredSent, setExpiredSent] = useState(false);
    const {
        formData: cryptoFormData,
        handleEditClick: cryptoHandleEdit,
        handleFormSubmit: cryptoSubmit,
        loading: loadingCryptoProcess,
        error: errorCryptoProcess
    } = useTableLogic<CryptoPaymentDetails>(
        cryptoPaymentConfig,
        useEntityFetch,
        ACTION_TYPES.CRYPTO
    );
    useEffect(() => {
        cryptoHandleEdit(ACTION_TYPES.CRYPTO, details);
    }, [details, cryptoHandleEdit]);
    useEffect(() => {
        if (expiredSent) return;
        const expiresMs = new Date(details.expires_at).getTime();
        const now = Date.now();
        const delay = expiresMs - now;
        const expire = async () => {
            try {
                const resp = await cryptoSubmit({
                    id: details.id,
                    subscription_id: details.subscription_id,
                    status: 'expired'
                });
                const updated = (resp as any).data as CryptoPaymentDetails;
                onUpdate?.(updated);
                setExpiredSent(true);
            } catch (err) {
                console.error('Error expiring crypto payment:', err);
            }
        };
        if (delay <= 0) {
            expire();
        } else {
            const timerId = setTimeout(expire, delay);
            return () => clearTimeout(timerId);
        }
    }, [details.expires_at, expiredSent, cryptoSubmit, details.id, details.subscription_id, onUpdate]);
    const network = cryptoFormData.network;
    const address = cryptoFormData.crypto_address;
    const cryptoAmount = cryptoFormData.crypto_amount;

    const timeLeft = usePaymentTimer(details.expires_at);
    const { copyToClipboard } = useClipboard();
    const { getConfirmationProgress, getConfirmationText } = useTransactionConfirmations(
        network,
        details.confirmations
    );

    const toggleQR = () => setShowQR(prev => !prev);

    const handleCopyAddress = async () => {
        await copyToClipboard(address);
        setIsAddressCopied(true);
        setTimeout(() => setIsAddressCopied(false), 2000);
    };

    const handleCopyAmount = async () => {
        await copyToClipboard(`${cryptoAmount} ${details.currency}`);
        setIsAmountCopied(true);
        setTimeout(() => setIsAmountCopied(false), 2000);
    };

    const handleNetworkChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const net = e.target.value;
        const addr = CRYPTO_WALLET_ADDRESSES[net] || '';
        const newAmt = (details.amount * (CRYPTO_EXCHANGE_RATES[net] || 0)).toFixed(8);

        try {
            const resp = await cryptoSubmit({
                id: details.id,
                subscription_id: details.subscription_id,
                network: net,
                crypto_address: addr,
                crypto_amount: newAmt
            });
            const updated: CryptoPaymentDetails = (resp as any).data;
            onUpdate?.(updated);
        } catch (err) {
            console.error('Error updating crypto options:', err);
        }
    };

    const handleOpenWallet = async () => {
        try {
            const resp = await cryptoSubmit({
                id: details.id,
                subscription_id: details.subscription_id,
                network,
                crypto_address: address,
                crypto_amount: cryptoAmount
            });
            const updated: CryptoPaymentDetails = (resp as any).data;
            onUpdate?.(updated);
        } catch (err) {
            console.error('Error updating crypto before opening wallet:', err);
        }
        window.open(getWalletUrl(network, address, cryptoAmount), '_blank');
    };

    return {
        showQR,
        toggleQR,
        network,
        address,
        cryptoAmount,
        isAddressCopied,
        isAmountCopied,
        handleCopyAddress,
        handleCopyAmount,
        timeLeft,
        getConfirmationProgress,
        getConfirmationText,
        handleNetworkChange,
        handleOpenWallet,
        loadingCryptoProcess,
        errorCryptoProcess,
    };
}; 