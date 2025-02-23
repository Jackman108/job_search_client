import {FC} from 'react';
import Button from '@ui/Button/Button';
import {FEEDBACK_HEADER} from '../config/feedbackConfigs';
import styles from '../../vacancies/ui/VacanciesTable/VacanciesTable.module.css';
import UnauthorizedMessage from '@ui/UnauthorizedMessage/UnauthorizedMessage';
import {useFeedbackContext} from "@app/providers/feedback/useFeedbackContext";
import {useSortedData} from "@hooks/useSortedData";
import {BUTTON_SYMBOL} from "@config/defaultConfig";

const FeedbackTable: FC = () => {
    const {feedbacks, loading, error, deleteFeedback} = useFeedbackContext();
    const {sortedData: sortedFeedbacks, handleSort, getSortArrow} = useSortedData(feedbacks || []);
    if (loading) return <div>Загрузка...</div>;
    if (feedbacks.length === 0) return <div>Приветствуем! Начните автоответ по вакансиям в панели слева...</div>;
    if (error) return <UnauthorizedMessage/>;

    return (
        <div className={styles.vacanciesTable}>
            <h1>{FEEDBACK_HEADER.tableTitle}</h1>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('id')}>{FEEDBACK_HEADER.feedbackId} {getSortArrow('id')}</th>
                    <th onClick={() => handleSort('vacancy_id')}>{FEEDBACK_HEADER.vacancyId} {getSortArrow('vacancy_id')}</th>
                    <th onClick={() => handleSort('feedback_text')}>{FEEDBACK_HEADER.feedbackText} {getSortArrow('feedback_text')}</th>
                    <th onClick={() => handleSort('feedback_date')}>{FEEDBACK_HEADER.feedbackDate} {getSortArrow('feedback_date')}</th>
                    <th onClick={() => handleSort('response_status')}>{FEEDBACK_HEADER.feedbackStatus} {getSortArrow('response_status')}</th>
                    <th>{FEEDBACK_HEADER.deletedButton}</th>
                </tr>
                </thead>

                <tbody>
                {sortedFeedbacks.map(feedback => (
                    <tr key={feedback.id}>
                        <td>{feedback.id}</td>
                        <td>{feedback.vacancy_id}</td>
                        <td>{feedback.feedback_text}</td>
                        <td>
                            <div className={styles.tableDate}>{feedback.feedback_date_time}</div>
                            <div className={styles.tableDate}>{feedback.feedback_date_date}</div>
                        </td>
                        <td>{feedback.response_status}</td>

                        <td>
                            <Button variant="close" onClick={() => deleteFeedback(feedback.id)}>
                                {BUTTON_SYMBOL.deleteButton}
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackTable;
