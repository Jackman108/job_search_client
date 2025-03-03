import {Route, Routes} from 'react-router-dom';
import FeedbackTable from '@features/feedback/ui/FeedbackTable';
import Resume from '@features/resume/ui/Resume';
import PaymentTable from '@features/payments/ui/PaymentTable/PaymentTable';
import SubscriptionTable from '@features/subscription/ui/SubscriptionTable/SubscriptionTable';
import FeedbackProvider from '../providers/feedback/FeedbackProvider';
import VacancyProvider from '../providers/vacancy/VacancyProvider';
import VacanciesTable from "@features/vacancies/ui/VacanciesTable/VacanciesTable";
import {I18nextProvider} from "react-i18next";
import i18n from "@config/i18n";

export const AppRoutes = () => (
    <VacancyProvider>
        <FeedbackProvider>
            <I18nextProvider i18n={i18n}>
                <Routes>
                    <Route path="/" element={<VacanciesTable/>}/>
                    <Route path="/feedback" element={<FeedbackTable/>}/>
                    <Route path="/resume" element={<Resume/>}/>
                    <Route path="/payment" element={<PaymentTable/>}/>
                    <Route path="/subscription" element={<SubscriptionTable/>}/>
                </Routes>
            </I18nextProvider>
        </FeedbackProvider>
    </VacancyProvider>

);