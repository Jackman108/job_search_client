// src/App.tsx
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import {AuthProvider} from './context/AuthProvider';
import {AppRoutes} from "./routes/AppRoutes";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                ТРУДОУСТРОЙСТВО
            </header>
            <main>
                <AuthProvider>
                    <BrowserRouter>
                        <Layout>
                            <AppRoutes/>
                        </Layout>
                    </BrowserRouter>
                </AuthProvider>
            </main>
        </div>
    );
}

export default App;
