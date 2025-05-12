import { ConfigItem } from '@type';
import { cryptoPaymentConfig } from './cryptoPaymentConfig';

/**
 * Конфигурация для таблицы криптоплатежей (листинг и обновление)
 */
export const cryptoPaymentsTableConfig: Record<string, ConfigItem> = {
    // Ключ для получения списка криптоплатежей
    crypto_payments: {
        title: 'Crypto Payments',
        apiEndpoint: '/payment/crypto',
        fields: {
            id: 'ID',
            subscription_id: 'Subscription ID',
            amount: 'Amount',
            currency: 'Currency',
            network: 'Network',
            crypto_address: 'Crypto Address',
            crypto_amount: 'Crypto Amount',
            status: 'Status',
            created_at: 'Created At',
            expires_at: 'Expires At',
            transaction_hash: 'Transaction Hash',
            wallet_provider: 'Wallet Provider'
        }
    },
    // Ключ для обновления параметров криптоплатежа
    updateCryptoPayment: cryptoPaymentConfig.updateCryptoPayment
}; 