import {FC} from 'react';
import Button from '@ui/Button/Button';
import {TABLE_VACANCIES} from "@features/vacancies/config/vacansiesConfig";
import {BUTTON_SYMBOL} from "@config/defaultConfig";
import styles from './VacancyRow.module.css';
import {VacancyRowProps} from "@features/vacancies/types/VacancyRow.props";


const VacancyRow: FC<VacancyRowProps> = ({vacancy, feedback, onMouseEnter, onMouseLeave, onDelete}) => {
    return (
        <tr key={vacancy.id} className={styles.VacancyRow}>
            <td>{vacancy.id}</td>
            <td>
                <a href={vacancy.url_vacancy} target="_blank" rel="noopener noreferrer">
                    {vacancy.title_vacancy}
                </a>
            </td>
            <td>
                <a href={vacancy.url_company} target="_blank" rel="noopener noreferrer">
                    {vacancy.title_company}
                </a>
            </td>
            <td>
                {vacancy.vacancy_status === 'true' ? TABLE_VACANCIES.tableResponded : TABLE_VACANCIES.tableMissed}
            </td>
            <td>
                <div className={styles.tableDate}>{vacancy.response_date_time}</div>
                <div className={styles.tableDate}>{vacancy.response_date_date}</div>
            </td>
            <td
                onMouseEnter={(e) => onMouseEnter(e, feedback?.feedback_text || null)}
                onMouseLeave={onMouseLeave}
            >
                {feedback?.response_status}
            </td>
            <td>
                <Button variant="close" onClick={() => onDelete(vacancy.id)}>
                    {BUTTON_SYMBOL.deleteButton}
                </Button>
            </td>
        </tr>
    );
};

export default VacancyRow;