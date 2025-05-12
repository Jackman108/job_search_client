import FeedbackTable from "@features/feedback/ui/FeedbackTable/FeedbackTable";
import CryptoPaymentTable from "@features/payments/ui/admin/crypto_payment/CryptoPaymentTable/CryptoPaymentTable";
import PaymentTable from "@features/payments/ui/admin/payment/PaymentTable/PaymentTable";

import ResumeSection from "@features/resume/ui/ResumeSection/ResumeSection";
import SubscriptionTable from "@features/subscription/ui/admin/SubscriptionTable/SubscriptionTable";
import VacanciesTable from "@features/vacancies/ui/VacanciesTable/VacanciesTable";
import { PaymentError, PaymentSuccess } from "@ui";
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