import {Route, Routes} from 'react-router-dom';
import FeedbackTable from '@features/feedback/ui/FeedbackTable';
import Resume from '@features/resume/ui/Resume';
import PaymentTable from '@features/payments/ui/PaymentTable/PaymentTable';
import Subscription from '@features/subscription/ui/Subscription';
import FeedbackProvider from '../providers/feedback/FeedbackProvider';
import VacancyProvider from '../providers/vacancy/VacancyProvider';
import VacanciesTable from "@features/vacancies/ui/VacanciesTable/VacanciesTable";

export const AppRoutes = () => (

    <VacancyProvider>
        <FeedbackProvider>
            <Routes>
                <Route path="/" element={<VacanciesTable/>}/>
                <Route path="/feedback" element={<FeedbackTable/>}/>
                <Route path="/resume" element={<Resume/>}/>
                <Route path="/payment" element={<PaymentTable/>}/>
                <Route path="/subscription" element={<Subscription/>}/>
            </Routes>
        </FeedbackProvider>
    </VacancyProvider>

);