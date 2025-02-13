import './App.css';
import Layout from './components/Layout/Layout';
import {AuthProvider} from './context/AuthProvider';
import {AppRoutes} from "./routes/AppRoutes";
import {SearchFormProvider} from "./context/SearchFormContext";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                ТРУДОУСТРОЙСТВО
            </header>
            <main>
                <AuthProvider>
                    <SearchFormProvider>
                        <Layout>
                            <AppRoutes/>
                        </Layout>
                    </SearchFormProvider>
                </AuthProvider>
            </main>
        </div>
    );
}

export default App;
