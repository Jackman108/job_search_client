// src/App.tsx
import './App.css';
import Layout from './components/Layout/Layout';
import VacanciesTable from './components/VacanciesTable/VacanciesTable';
import TableProvider from './context/TableProvider';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        ТРУДОУСТРОЙСТВО
      </header>
      <main>
        <AuthProvider>
          <Layout>
            <TableProvider>
              <VacanciesTable />
            </TableProvider>
          </Layout>
        </AuthProvider>
      </main>
    </div>
  );
}

export default App;
