import { useState, useEffect } from 'react';
import { CryptoPaymentDetails as CryptoDetails } from '@entities/payment';
import { useCryptoPaymentHandler } from './useCryptoPaymentHandler';
import { usePaymentTimer } from './usePaymentTimer';
import { useClipboard } from './useClipboard';
import { useTransactionConfirmations } from './useTransactionConfirmations';
import { CRYPTO_WALLET_ADDRESSES, CRYPTO_EXCHANGE_RATES } from '@entities/payment';
import { getWalletUrl } from '@entities/payment/config/cryptoPaymentConfig';

/**
 * Hook for managing state and business logic for crypto payment details view.
 */
export const useCryptoPaymentViewModel = (
    details: CryptoDetails,
    onUpdate?: (updated: CryptoDetails) => void
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
        checkCryptoPaymentStatus,
        updateCryptoOptions,
        loadingCryptoProcess,
        errorCryptoProcess
    } = useCryptoPaymentHandler();

    // Poll for status every 30 seconds for pending payments
    useEffect(() => {
        if (details.status.toLowerCase() !== 'pending') return;
        const intervalId = setInterval(async () => {
            try {
                const response = await checkCryptoPaymentStatus(
                    details.id,
                    details.status,
                    details.confirmations,
                    details.transaction_hash
                );
                const newStatus = response?.data?.status;
                if (newStatus?.toLowerCase() === 'completed') {
                    const resp = await updateCryptoOptions({
                        paymentId: details.id,
                        network,
                        crypto_address: address,
                        crypto_amount: cryptoAmount
                    });
                    const updatedDetail = resp.data ?? resp;
                    onUpdate?.(updatedDetail);
                    clearInterval(intervalId);
                }
            } catch (err) {
                console.error('Error polling crypto status:', err);
            }
        }, 30000);

        return () => clearInterval(intervalId);
    }, [
        details.id,
        details.status,
        network,
        address,
        cryptoAmount,
        details.confirmations,
        details.transaction_hash,
        checkCryptoPaymentStatus,
        updateCryptoOptions,
        onUpdate
    ]);

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
        const rate = CRYPTO_EXCHANGE_RATES[net] || 0;
        const newAmt = (details.amount * rate).toFixed(8);

        setNetwork(net);
        setAddress(addr);
        setCryptoAmount(newAmt);

        try {
            const resp = await updateCryptoOptions({
                paymentId: details.id,
                network: net,
                crypto_address: addr,
                crypto_amount: newAmt
            });
            const updatedDetail = resp.data ?? resp;
            onUpdate?.(updatedDetail);
        } catch (err) {
            console.error('Error updating crypto options:', err);
        }
    };

    const handleOpenWallet = async () => {
        try {
            const resp = await updateCryptoOptions({
                paymentId: details.id,
                network,
                crypto_address: address,
                crypto_amount: cryptoAmount
            });
            const updatedDetail = resp.data ?? resp;
            onUpdate?.(updatedDetail);
        } catch (err) {
            console.error('Error updating crypto options:', err);
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