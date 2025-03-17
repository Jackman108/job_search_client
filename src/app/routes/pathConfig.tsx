import VacanciesTable from "@features/vacancies/ui/VacanciesTable/VacanciesTable";
import FeedbackTable from "@features/feedback/ui/FeedbackTable/FeedbackTable";
import ResumeSection from "@features/resume/ui/ResumeSection/ResumeSection";
import PaymentTable from "@features/payments/ui/admin/PaymentTable/PaymentTable";
import SubscriptionTable from "@features/subscription/ui/admin/SubscriptionTable/SubscriptionTable";
import {PaymentError, PaymentSuccess} from "@ui";

export const routes = [
    {path: '/', element: <VacanciesTable/>},
    {path: '/feedback', element: <FeedbackTable/>},
    {path: '/resume', element: <ResumeSection/>},
    {path: '/payments', element: <PaymentTable/>},
    {path: '/subscriptions', element: <SubscriptionTable/>},
    {path: '/payment/success', element: <PaymentSuccess/>},
    {path: '/payment/error', element: <PaymentError/>},
];