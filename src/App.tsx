// src/App.tsx
import './App.css';
import Layout from './components/Layout/Layout';
import VacanciesTable from './components/VacanciesTable/VacanciesTable';
import VacanciesProvider from './hooks/VacanciesProvider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        автоотклик hh
      </header>
      <main>
        <Layout>
          <VacanciesProvider>
            <VacanciesTable />
          </VacanciesProvider>
        </Layout>

      </main>
    </div>
  );
}

export default App;
