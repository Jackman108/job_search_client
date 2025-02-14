import {Route, Routes} from 'react-router-dom';
import VacanciesTable from '../components/VacanciesTable/VacanciesTable';
import FeedbackTable from '../components/FeedbackTable/FeedbackTable';
import Resume from '../components/Resume/Resume';
import Payment from '../components/Payment/Payment';
import Subscription from '../components/Subscription/Subscription';
import FeedbackProvider from '../context/FeedbackProvider';
import VacancyProvider from '../context/VacancyProvider';

export const AppRoutes = () => (

    <VacancyProvider>
        <Routes>
            <Route path="/" element={<VacanciesTable/>}/>
            <Route path="/feedback" element={
                <FeedbackProvider>
                    <FeedbackTable/>
                </FeedbackProvider>
            }/>
            <Route path="/resume" element={<Resume/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/subscription" element={<Subscription/>}/>
        </Routes>
    </VacancyProvider>

);