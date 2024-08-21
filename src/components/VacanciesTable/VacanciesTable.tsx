import { FC } from 'react';
import { useTableContext } from '../../context/useTableContext';
import { useSortedVacancies } from '../../hooks/useSortedVacancies';
import './VacanciesTable.css';

const VacanciesTable: FC = (
): JSX.Element => {
  const { vacancies, loading, error } = useTableContext();
  const { sortedVacancies, handleSort, getSortArrow } = useSortedVacancies(vacancies);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="vacanciesTable">
      <h1>Обработанные вакансии</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>№ {getSortArrow('id')}</th>
            <th onClick={() => handleSort('url_vacancy')}>Должность {getSortArrow('url_vacancy')}</th>
            <th onClick={() => handleSort('url_company')}>Компани {getSortArrow('url_company')}</th>
            <th onClick={() => handleSort('vacancy_status')}>Результат {getSortArrow('vacancy_status')}</th>
            <th onClick={() => handleSort('response_date')}>Дата {getSortArrow('response_date')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedVacancies.map(vacancy => (
            <tr key={vacancy.id}>
              <td>{vacancy.id}</td>
              <td><a href={vacancy.url_vacancy} target="_blank" rel="noopener noreferrer">{vacancy.title_vacancy}</a></td>
              <td><a href={vacancy.url_company} target="_blank" rel="noopener noreferrer">{vacancy.title_company}</a></td>
              <td>{vacancy.vacancy_status ? 'Откликнулся' : 'Пропустил'}</td>
              <td>
                <div className="tableDate">{vacancy.response_date_time}</div>
                <div className="tableDate">{vacancy.response_date_date}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VacanciesTable;
