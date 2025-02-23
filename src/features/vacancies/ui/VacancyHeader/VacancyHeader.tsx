import {FC, memo} from 'react';
import {TABLE_VACANCIES} from "@features/vacancies/config/vacansiesConfig";
import {VacancyHeaderProps} from "@features/vacancies/types/VacancyHeader.props";
import styles from './VacancyHeader.module.css';

const VacancyHeader: FC<VacancyHeaderProps> = memo(({handleSort, getSortArrow}) => {
    return (
        <thead className={styles.VacancyHeader}>
        <tr>
            <th onClick={() => handleSort('id')}>{TABLE_VACANCIES.tableID} {getSortArrow('id')}</th>
            <th onClick={() => handleSort('url_vacancy')}>{TABLE_VACANCIES.tablePosition} {getSortArrow('url_vacancy')}</th>
            <th onClick={() => handleSort('url_company')}>{TABLE_VACANCIES.tableCompany} {getSortArrow('url_company')}</th>
            <th onClick={() => handleSort('vacancy_status')}>{TABLE_VACANCIES.tableResult} {getSortArrow('vacancy_status')}</th>
            <th onClick={() => handleSort('response_date')}>{TABLE_VACANCIES.tableDate} {getSortArrow('response_date')}</th>
            <th>{TABLE_VACANCIES.feedbackStatus}</th>
            <th>{TABLE_VACANCIES.deletedButton}</th>
        </tr>
        </thead>
    );
});

export default VacancyHeader;