import {FC} from 'react';
import Button from '@ui/Button/Button';
import {useVacancyContext} from '@app/providers/vacancy/useVacancyContext';
import {useSortedData} from '@hooks/useSortedData';
import styles from './VacanciesTable.module.css';
import UnauthorizedMessage from '@ui/UnauthorizedMessage/UnauthorizedMessage';
import {BUTTON_SYMBOL} from "@config/defaultConfig";
import {TABLE_VACANCIES} from "@features/vacancies/config/vacansiesConfig";

const VacanciesTable: FC = () => {
    const {vacancies, loading, error, deleteVacancy} = useVacancyContext();
    const {sortedData: sortedVacancies, handleSort, getSortArrow} = useSortedData(vacancies);
    if (loading) return <div>Загрузка...</div>;
    if (vacancies.length === 0) return <div>Приветствуем! Начните автоответ по вакансиям в панели слева...</div>;
    if (error) return <UnauthorizedMessage/>;

    return (
        <div className={styles.vacanciesTable}>
            <h1>{TABLE_VACANCIES.tableTitle}</h1>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>{TABLE_VACANCIES.tableNumde} {getSortArrow('id')}</th>
                    <th onClick={() => handleSort('url_vacancy')}>{TABLE_VACANCIES.tablePosition} {getSortArrow('url_vacancy')}</th>
                    <th onClick={() => handleSort('url_company')}>{TABLE_VACANCIES.tableCompany} {getSortArrow('url_company')}</th>
                    <th onClick={() => handleSort('vacancy_status')}>{TABLE_VACANCIES.tableResult} {getSortArrow('vacancy_status')}</th>
                    <th onClick={() => handleSort('response_date')}>{TABLE_VACANCIES.tableDate} {getSortArrow('response_date')}</th>
                    <th>{TABLE_VACANCIES.deletedButton}</th>
                </tr>
                </thead>

                <tbody>
                {sortedVacancies.map(vacancy => (
                    <tr key={vacancy.id}>
                        <td>{vacancy.id}</td>
                        <td><a href={vacancy.url_vacancy} target="_blank"
                               rel="noopener noreferrer">{vacancy.title_vacancy}</a></td>
                        <td><a href={vacancy.url_company} target="_blank"
                               rel="noopener noreferrer">{vacancy.title_company}</a></td>
                        <td>{vacancy.vacancy_status === 'true' ? TABLE_VACANCIES.tableResponded : TABLE_VACANCIES.tableMissed}</td>
                        <td>
                            <div className={styles.tableDate}>{vacancy.response_date_time}</div>
                            <div className={styles.tableDate}>{vacancy.response_date_date}</div>
                        </td>
                        <td>
                            <Button variant="close"
                                    onClick={() => deleteVacancy(vacancy.id)}>{BUTTON_SYMBOL.deleteButton}</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default VacanciesTable;
