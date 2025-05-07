import { CryptoPaymentDetails } from '../types/CryptoPayment.types';
import { SUPPORTED_CRYPTO_NETWORKS } from '../config/cryptoPaymentConfig';

export const mockCryptoResponse: CryptoPaymentDetails = {
    paymentId: 'mock-crypto-payment-123',
    cryptoAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    cryptoAmount: '0.00123456',
    currency: 'BTC',
    status: 'pending',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    network: 'BTC',
    qrCodeUrl: 'bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh?amount=0.00123456',
    exchangeRate: 45000,
    fiatAmount: 55.56,
    fiatCurrency: 'USD',
    minConfirmations: 3
};

export const mockCryptoPaymentMethods = SUPPORTED_CRYPTO_NETWORKS.map(network => ({
    id: network.value,
    name: network.label,
    icon: `/assets/crypto/${network.value.toLowerCase()}.svg`,
    minAmount: 0.0001,
    maxAmount: 1.0,
    fee: 0.0001,
    processingTime: '10-30 minutes',
    confirmations: network.value === 'BTC' ? 3 : 12
})); 