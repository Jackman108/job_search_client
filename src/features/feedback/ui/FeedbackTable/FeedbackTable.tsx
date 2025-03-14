import {FC} from 'react';
import {UnauthorizedMessage} from '@ui';
import styles from './FeedbackTable.module.css';
import {useSortedData} from "@hooks";
import {LOCALES} from "@config";
import useFetchFeedbacks from "@features/feedback/hooks/useFetchFeedbacks";
import {FEEDBACK_HEADER} from "@entities/feedback";
import FeedbackRow from "@features/feedback/ui/FeedbackRow/FeedbackRow";
import FeedbackHeader from "@features/feedback/ui/FeedbackHeader/FeedbackHeader";

const FeedbackTable: FC = () => {
    const {feedbacks, loading, error, deleteFeedback} = useFetchFeedbacks();
    const {sortedData: sortedFeedbacks, handleSort, getSortArrow} = useSortedData(feedbacks || []);

    if (loading) return <div>{LOCALES.LOADING}</div>;
    if (feedbacks.length === 0) return <div>{LOCALES.WELCOME_MESSAGE}</div>;
    if (error) return <UnauthorizedMessage/>;

    return (
        <div className={styles.FeedbackTable}>
            <h1>{FEEDBACK_HEADER.tableTitle}</h1>
            <table>
                <FeedbackHeader handleSort={handleSort} getSortArrow={getSortArrow}/>
                <tbody>
                {sortedFeedbacks.map(feedback => (
                    <FeedbackRow key={feedback.id} feedback={feedback} deleteFeedback={deleteFeedback}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackTable;
