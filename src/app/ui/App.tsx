import './App.css';
import {AuthProvider, FeedbackProvider, SearchFormProvider, VacancyProvider} from '@app/providers';
import {AppRoutes} from "../routes/AppRoutes";
import {BrowserRouter} from "react-router-dom";
import {i18next} from "@config";
import {I18nextProvider} from "react-i18next";
import {Header, Layout} from "@widgets";

function App() {
    return (
        <div className="App">
            <I18nextProvider i18n={i18next}>
                <AuthProvider>
                    <SearchFormProvider>
                        <BrowserRouter>
                            <Header/>
                            <main>
                                <Layout>
                                    <VacancyProvider>
                                        <FeedbackProvider>
                                            <AppRoutes/>
                                        </FeedbackProvider>
                                    </VacancyProvider>
                                </Layout>
                            </main>
                        </BrowserRouter>
                    </SearchFormProvider>
                </AuthProvider>
            </I18nextProvider>
        </div>
    );
}

export default App;
