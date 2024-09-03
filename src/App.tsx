// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import VacanciesTable from './components/VacanciesTable/VacanciesTable';
import { AuthProvider } from './context/AuthProvider';
import TableProvider from './context/TableProvider';
import {DataDisplay} from './components/DataDisplay/DataDisplay';
import { dataDisplayConfig } from './config/displayConfig';

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
                  <Route path="/resume" element={<DataDisplay config={dataDisplayConfig} />} />
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
