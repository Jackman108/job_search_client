export interface CryptoPaymentDetails {
    paymentId: string;
    cryptoAddress: string;
    cryptoAmount: string;
    currency: string;
    status: string;
    createdAt: Date;
    expiresAt: Date;
    network: string;
    qrCodeUrl?: string;
    exchangeRate?: number;
    fiatAmount?: number;
    fiatCurrency?: string;
    transactionHash?: string;
    confirmations?: number;
    minConfirmations: number;
    paymentUrl?: string;
}

export interface CryptoPaymentRequest {
    subscription_id: string;
    amount: number;
    currency: string;
    network?: string;
}

export interface CryptoPaymentResponse {
    success: boolean;
    details: CryptoPaymentDetails;
    error?: string;
}

export interface CryptoPaymentStatus {
    status: string;
    confirmations?: number;
    transactionHash?: string;
    error?: string;
} 