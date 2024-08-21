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
        автоотклик hh
      </header>
      <main>
        <Layout>
          <AuthProvider>
            <VacanciesProvider>
              <VacanciesTable />
            </VacanciesProvider>
          </AuthProvider>
        </Layout>

      </main>
    </div>
  );
}

export default App;
