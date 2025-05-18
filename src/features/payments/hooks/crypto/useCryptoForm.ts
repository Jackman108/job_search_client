import { ACTION_TYPES } from '@config';
import { CRYPTO_EXCHANGE_RATES, CRYPTO_WALLET_ADDRESSES, CryptoPaymentDetails } from '@entities/payment';
import { getWalletUrl } from '@entities/payment/config/cryptoPaymentConfig';
import { usePaymentTimer } from '@features/payments/hooks/base/usePaymentTimer';
import { useCryptoPaymentLogic } from '@features/payments/hooks';
import { useTransactionConfirmations } from '@features/payments/hooks/crypto/useTransactionConfirmations';
import { useClipboard } from '@hooks';
import { useEffect, useState } from 'react';
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
        cryptoFormData,
        cryptoEditClick: cryptoHandleEdit,
        cryptoFormSubmit: cryptoSubmit,
        cryptoLoading: loadingCryptoProcess,
        cryptoError: errorCryptoProcess,
    } = useCryptoPaymentLogic();

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