// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { DataDisplay } from './components/DataDisplay/DataDisplay';
import Layout from './components/Layout/Layout';
import VacanciesTable from './components/VacanciesTable/VacanciesTable';
import { AuthProvider } from './context/AuthProvider';
import TableProvider from './context/TableProvider';

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
                  <Route path="/" element={<VacanciesTable />} />
                  <Route path="/resume" element={<DataDisplay  />} />
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
