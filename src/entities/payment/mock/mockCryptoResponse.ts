import { CryptoPaymentDetails } from '../types/CryptoPayment.types';
import { SUPPORTED_CRYPTO_NETWORKS } from '../config/cryptoPaymentConfig';

export const mockCryptoResponse: CryptoPaymentDetails = {
    id: 'mock-crypto-payment-123',
    subscription_id: 'mock-subscription-123',
    amount: '0.00123456',
    crypto_address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    crypto_amount: '0.00123456',
    currency: 'BTC',
    status: 'pending',
    created_at: new Date(),
    expires_at: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    network: 'BTC',
    payment_url: 'bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh?amount=0.00123456',
    transaction_hash: null,
    wallet_provider: 'mock'
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