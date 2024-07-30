// src/App.tsx
import './App.css';
import VacanciesTable from './components/VacanciesTable/VacanciesTable';
import VacancyForm from './components/VacancyForm/VacancyForm';
import VacanciesProvider from './hooks/VacanciesProvider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        автоотклик hh
      </header>
      <main>
        <VacancyForm />
        <VacanciesProvider>
          <VacanciesTable />
        </VacanciesProvider>
      </main>
    </div>
  );
}

export default App;
