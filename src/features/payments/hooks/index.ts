/**
 * Экспорт всех хуков, связанных с платежами
 */
// Base payment hooks
export { usePaymentStatusHandler } from './base/usePaymentStatusHandler';
export { usePaymentForm } from './base/usePaymentForm';
export { usePaymentTimer } from './base/usePaymentTimer';

// Fiat payment hooks (WebPay, ERIP)
export { useProcessHandler } from './fiat/useProcessHandler';

// Combined payment logic (CRUD + processing)
export { usePaymentLogic } from './base/usePaymentLogic';

// Crypto payment hooks
export { useCryptoPaymentLogic } from './crypto/useCryptoPaymentLogic';
export { useCryptoForm as useCryptoPaymentViewModel } from './crypto/useCryptoForm';
export { useTransactionConfirmations } from './crypto/useTransactionConfirmations';
