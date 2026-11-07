import React, { lazy } from 'react';
import type { AccessLevel } from '@utils';

const VacanciesTable = lazy(() => import('@features/vacancies/ui/VacanciesTable/VacanciesTable'));
const FeedbackTable = lazy(() => import('@features/feedback/ui/FeedbackTable/FeedbackTable'));
const ResumeSection = lazy(() => import('@features/resume/ui/ResumeSection/ResumeSection'));
const PaymentTable = lazy(() => import('@features/payments/ui/admin/payment/PaymentTable/PaymentTable'));
const CryptoPaymentTable = lazy(
    () => import('@features/payments/ui/admin/crypto_payment/CryptoPaymentTable/CryptoPaymentTable'),
);
const SubscriptionTable = lazy(() => import('@features/subscription/ui/admin/SubscriptionTable/SubscriptionTable'));
const PaymentSuccess = lazy(() => import('@ui').then((module) => ({ default: module.PaymentSuccess })));
const PaymentError = lazy(() => import('@ui').then((module) => ({ default: module.PaymentError })));
const ServerError = lazy(() => import('@ui').then((module) => ({ default: module.ServerError })));

export interface AppRouteConfig {
    path: string;
    element: React.ReactElement;
    access: AccessLevel;
}

export const routes: AppRouteConfig[] = [
    { path: '/', element: <VacanciesTable />, access: 'auth' },
    { path: '/feedback', element: <FeedbackTable />, access: 'auth' },
    { path: '/resume', element: <ResumeSection />, access: 'auth' },
    { path: '/payments', element: <PaymentTable />, access: 'admin' },
    { path: '/subscriptions', element: <SubscriptionTable />, access: 'admin' },
    { path: '/payment/success', element: <PaymentSuccess />, access: 'public' },
    { path: '/payment/error', element: <PaymentError />, access: 'public' },
    { path: '/crypto-payments', element: <CryptoPaymentTable />, access: 'admin' },
    { path: '/server-error', element: <ServerError />, access: 'public' },
];
