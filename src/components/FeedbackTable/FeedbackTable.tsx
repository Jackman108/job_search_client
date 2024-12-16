import {FC} from 'react';
import Button from '../../UI/Button/Button';
import {BUTTON_SYMBOL, FEEDBACK_HEADER} from '../../config/formConfigs';
import styles from './FeedbacksTable.module.css';
import UnauthorizedMessage from '../../UI/UnauthorizedMessage/UnauthorizedMessage';
import {useFeedbackContext} from "../../context/useFeedbackContext";
import {useSortedData} from "../../hooks/useSortedData";

const FeedbackTable: FC = () => {
    const {feedbacks, loading, deleteFeedback, fetchFeedbacks} = useFeedbackContext();
    const {sortedData: sortedFeedbacks, handleSort, getSortArrow} = useSortedData(feedbacks);

    if (loading) return <div>Загрузка...</div>;
    if (feedbacks.length === 0) {
        return <UnauthorizedMessage/>;
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteFeedback(id);
            await fetchFeedbacks();
        } catch (err) {
            console.error('Ошибка удаления обратной связи:', err);
        }
    };
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
                            <Button variant="close" onClick={() => handleDelete(feedback.id)}>
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
