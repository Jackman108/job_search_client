import { FC } from 'react';
import Button from '../../UI/Button/Button';
import { BUTTON_SYMBOL, TABLE_HEADER } from '../../config/formConfigs';
import { useTableContext } from '../../context/useTableContext';
import useDeleteVacancy from '../../hooks/useDeleteVacancy';
import { useSortedVacancies } from '../../hooks/useSortedVacancies';
import './VacanciesTable.css';
import Graph from '../../UI/Graph/Graph';

const VacanciesTable: FC = (
): JSX.Element => {
  const { vacancies, loading, error } = useTableContext();
  const { sortedVacancies, handleSort, getSortArrow } = useSortedVacancies(vacancies);
  const { deleteVacancy } = useDeleteVacancy();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  const handleDelete = async (id: number) => {
    try {
      await deleteVacancy(id);
    } catch (err) {
      console.error('Ошибка удаления вакансии:', err);
    }
  };



  return (
    <div className="vacanciesTable">
      <h1>{TABLE_HEADER.tableTitle}</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>{TABLE_HEADER.tableNumde} {getSortArrow('id')}</th>
            <th onClick={() => handleSort('url_vacancy')}>{TABLE_HEADER.tablePosition} {getSortArrow('url_vacancy')}</th>
            <th onClick={() => handleSort('url_company')}>{TABLE_HEADER.tableCompany} {getSortArrow('url_company')}</th>
            <th onClick={() => handleSort('vacancy_status')}>{TABLE_HEADER.tableResult} {getSortArrow('vacancy_status')}</th>
            <th onClick={() => handleSort('response_date')}>{TABLE_HEADER.tableDate} {getSortArrow('response_date')}</th>
            <th>{TABLE_HEADER.deletedButton}</th>
          </tr>
        </thead>
        
        <tbody>
          {sortedVacancies.map(vacancy => (
            <tr key={vacancy.id}>
              <td>{vacancy.id}</td>
              <td><a href={vacancy.url_vacancy} target="_blank" rel="noopener noreferrer">{vacancy.title_vacancy}</a></td>
              <td><a href={vacancy.url_company} target="_blank" rel="noopener noreferrer">{vacancy.title_company}</a></td>
              <td>{vacancy.vacancy_status === 'true' ? TABLE_HEADER.tableResponded : TABLE_HEADER.tableMissed}</td>
              <td>
                <div className="tableDate">{vacancy.response_date_time}</div>
                <div className="tableDate">{vacancy.response_date_date}</div>
              </td>
              <td>
              <Button variant="close" onClick={() => handleDelete(vacancy.id)}>{BUTTON_SYMBOL.deleteButton}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Graph sortedVacancies={sortedVacancies}/>
    </div>
  );
};

export default VacanciesTable;
