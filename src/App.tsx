// src/App.tsx
import './App.css';
import Layout from './components/Layout/Layout';
import VacanciesTable from './components/VacanciesTable/VacanciesTable';
import VacanciesProvider from './hooks/VacanciesProvider';
import { AuthProvider } from './context/useAuthContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        ТРУДОУСТРОЙСТВО
      </header>
      <main>
        <AuthProvider>
          <Layout>
            <VacanciesProvider>
              <VacanciesTable />
            </VacanciesProvider>
          </Layout>
        </AuthProvider>
      </main>
    </div>
  );
}

export default App;
