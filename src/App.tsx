// src/App.tsx
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import {Resume} from './components/Resume/Resume';
import VacanciesTable from './components/VacanciesTable/VacanciesTable';
import {AuthProvider} from './context/AuthProvider';
import TableProvider from './context/TableProvider';
import Payment from "./components/Payment/Payment";
import Subscription from "./components/Subscription/Subscription";

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
                            <TableProvider>
                                <Routes>
                                    <Route path="/" element={<VacanciesTable/>}/>
                                    <Route path="/resume" element={<Resume/>}/>
                                    <Route path="/payment" element={<Payment/>}/>
                                    <Route path="/subscription" element={<Subscription/>}/>
                                </Routes>
                            </TableProvider>
                        </Layout>
                    </BrowserRouter>
                </AuthProvider>
            </main>
        </div>
    );
}

export default App;
