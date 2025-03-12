import VacanciesTable from "@features/vacancies/ui/VacanciesTable/VacanciesTable";
import FeedbackTable from "@features/feedback/ui/FeedbackTable";
import Resume from "@features/resume/ui/Resume";
import PaymentTable from "@features/payments/ui/admin/PaymentTable/PaymentTable";
import SubscriptionTable from "@features/subscription/ui/admin/SubscriptionTable/SubscriptionTable";
import SubscriptionUser from "@features/subscription/ui/user/SubscriptionUser/SubscriptionUser";
import {PaymentError, PaymentSuccess} from "@ui";

export const routes = [
    {path: '/', element: <VacanciesTable/>},
    {path: '/feedback', element: <FeedbackTable/>},
    {path: '/resume', element: <Resume/>},
    {path: '/payments', element: <PaymentTable/>},
    {path: '/subscriptions', element: <SubscriptionTable/>},
    {path: '/subscription', element: <SubscriptionUser/>},
    {path: '/payment/success', element: <PaymentSuccess/>},
    {path: '/payment/error', element: <PaymentError/>},
];