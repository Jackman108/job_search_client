import { CRYPTO_EXCHANGE_RATES, CRYPTO_WALLET_ADDRESSES, CryptoPaymentDetails } from '@entities/payment';
import { getWalletUrl } from '@entities/payment/config/cryptoPaymentConfig';
import { cryptoPaymentConfig } from '@entities/payment/config/cryptoPaymentConfig';
import { useEntityFetch, useTableLogic, useClipboard } from '@hooks';
import { ACTION_TYPES } from '@shared/config';
import { useState } from 'react';
import { usePaymentTimer } from './usePaymentTimer';
import { useTransactionConfirmations } from './useTransactionConfirmations';
/**
 * Hook for managing state and business logic for crypto payment details view.
 */
export const useCryptoPaymentViewModel = (
    details: CryptoPaymentDetails,
    onUpdate?: (updated: CryptoPaymentDetails) => void
) => {
    const [showQR, setShowQR] = useState(true);
    const [isAddressCopied, setIsAddressCopied] = useState(false);
    const [isAmountCopied, setIsAmountCopied] = useState(false);
    const [network, setNetwork] = useState<string>(details.network);
    const initialAddress = details.crypto_address || CRYPTO_WALLET_ADDRESSES[details.network] || '';
    const [address, setAddress] = useState<string>(initialAddress);
    const initialCryptoAmount = (details.amount * (CRYPTO_EXCHANGE_RATES[details.network] || 0)).toFixed(8);
    const [cryptoAmount, setCryptoAmount] = useState<string>(initialCryptoAmount);

    const timeLeft = usePaymentTimer(details.expires_at);
    const { copyToClipboard } = useClipboard();
    const { getConfirmationProgress, getConfirmationText } = useTransactionConfirmations(
        network,
        details.confirmations
    );
    const {
        saveItem: handleFormSubmit,
        loading: loadingCryptoProcess,
        error: errorCryptoProcess
    } = useEntityFetch<CryptoPaymentDetails>(
        cryptoPaymentConfig
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

        setNetwork(net);
        setAddress(addr);
        setCryptoAmount(newAmt);

        try {
            const resp = await handleFormSubmit({
                type: ACTION_TYPES.CRYPTO,
                id: details.id,
                formData: { subscription_id: details.subscription_id, network: net, crypto_address: addr, crypto_amount: newAmt },
                isEditing: true
            });
            const updatedDetail = (resp as any).data ?? resp;
            onUpdate?.(updatedDetail as CryptoPaymentDetails);
        } catch (err) {
            console.error('Error updating crypto options:', err);
        }
    };

    const handleOpenWallet = async () => {
        try {
            const resp = await handleFormSubmit({
                type: ACTION_TYPES.CRYPTO,
                id: details.id,
                formData: { subscription_id: details.subscription_id, network, crypto_address: address, crypto_amount: cryptoAmount },
                isEditing: true
            });
            const updatedDetail = (resp as any).data ?? resp;
            onUpdate?.(updatedDetail as CryptoPaymentDetails);
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
        errorCryptoProcess
    };
}; 