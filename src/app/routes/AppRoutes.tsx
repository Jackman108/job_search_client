import {Route, Routes} from 'react-router-dom';
import FeedbackProvider from '@app/providers/feedback/FeedbackProvider';
import VacancyProvider from '@app//providers/vacancy/VacancyProvider';
import {I18nextProvider} from "react-i18next";
import {i18next} from "@config";
import {routes} from "@app/routes/pathConfig";


export const AppRoutes = () => (
    <VacancyProvider>
        <FeedbackProvider>
            <I18nextProvider i18n={i18next}>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}/>
                    ))}
                </Routes>
            </I18nextProvider>
        </FeedbackProvider>
    </VacancyProvider>

);