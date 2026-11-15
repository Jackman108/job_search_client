import { FC } from 'react';
import { Button } from '@ui';
import styles from './FeedbackRow.module.css';
import { FeedbackRowProps } from '@features/feedback/props/Feedback.props';
import { BUTTON_SYMBOL } from '@config';

const FeedbackRow: FC<FeedbackRowProps> = ({ feedback, deleteFeedback }) => {
    const vacancyHref = feedback.vacancy_id
        ? `https://hh.ru/vacancy/${encodeURIComponent(String(feedback.vacancy_id))}`
        : null;
    const statusLine = [feedback.title_company, feedback.response_status].filter(Boolean).join(' · ');

    return (
        <tr key={feedback.id} className={styles.FeedbackRow}>
            <td>{feedback.id}</td>
            <td>
                {vacancyHref ? (
                    <a href={vacancyHref} target="_blank" rel="noreferrer noopener">
                        {feedback.vacancy_id}
                    </a>
                ) : (
                    feedback.vacancy_id
                )}
            </td>
            <td>
                {vacancyHref ? (
                    <a href={vacancyHref} target="_blank" rel="noreferrer noopener">
                        {feedback.title_vacancy || '—'}
                    </a>
                ) : (
                    feedback.title_vacancy || '—'
                )}
            </td>
            <td title={statusLine}>{feedback.title_company || '—'}</td>
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
    );
};

export default FeedbackRow;
