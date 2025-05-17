import React, { lazy } from 'react';

const VacanciesTable = lazy(() => import('@features/vacancies/ui/VacanciesTable/VacanciesTable'));
const FeedbackTable = lazy(() => import('@features/feedback/ui/FeedbackTable/FeedbackTable'));
const ResumeSection = lazy(() => import('@features/resume/ui/ResumeSection/ResumeSection'));
const PaymentTable = lazy(() => import('@features/payments/ui/admin/payment/PaymentTable/PaymentTable'));
const CryptoPaymentTable = lazy(() => import('@features/payments/ui/admin/crypto_payment/CryptoPaymentTable/CryptoPaymentTable'));
const SubscriptionTable = lazy(() => import('@features/subscription/ui/admin/SubscriptionTable/SubscriptionTable'));
const PaymentSuccess = lazy(() => import('@ui').then(module => ({ default: module.PaymentSuccess })));
const PaymentError = lazy(() => import('@ui').then(module => ({ default: module.PaymentError })));

export const routes = [
    {path: '/', element: <VacanciesTable/>},
    {path: '/feedback', element: <FeedbackTable/>},
    {path: '/resume', element: <ResumeSection/>},
    {path: '/payments', element: <PaymentTable/>},
    {path: '/subscriptions', element: <SubscriptionTable/>},
    {path: '/payment/success', element: <PaymentSuccess/>},
    {path: '/payment/error', element: <PaymentError/>},
    {path: '/crypto-payments', element: <CryptoPaymentTable/>},
];