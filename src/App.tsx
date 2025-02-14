import './App.css';
import Layout from './components/Layout/Layout';
import {AuthProvider} from './context/AuthProvider';
import {AppRoutes} from "./routes/AppRoutes";
import {SearchFormProvider} from "./context/SearchFormContext";
import {BrowserRouter} from "react-router-dom";

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
