// Конфигурация адресов кошельков для различных крипто-сетей
export const CRYPTO_WALLET_ADDRESSES: Record<string, string> = {
    BTC: process.env.REACT_APP_WALLET_BTC || '',
    USDT: process.env.REACT_APP_WALLET_USDT || '',
    BCH: process.env.REACT_APP_WALLET_BCH || '',
    LTC: process.env.REACT_APP_WALLET_LTC || '',
}; 