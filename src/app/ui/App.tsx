import './App.css';
import Layout from '@widgets/layout/ui/Layout';
import {AuthProvider} from '../providers/auth/AuthProvider';
import {AppRoutes} from "../routes/AppRoutes";
import {BrowserRouter} from "react-router-dom";
import {SearchFormProvider} from "../providers/search/SearchFormProvider";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                ТРУДОУСТРОЙСТВО
            </header>
            <main>
                <AuthProvider>
                    <SearchFormProvider>
                        <BrowserRouter>
                            <Layout>
                                <AppRoutes/>
                            </Layout>
                        </BrowserRouter>
                    </SearchFormProvider>
                </AuthProvider>
            </main>
        </div>
    );
}

export default App;
