import { FC, useMemo } from 'react';
import { UnauthorizedMessage } from '@ui';
import styles from './FeedbackTable.module.css';
import { useSortedData } from '@hooks';
import { LOCALES } from '@config';
import useFetchFeedbacks from '@features/feedback/hooks/useFetchFeedbacks';
import { compareFeedbackByStatusThenDate, FEEDBACK_HEADER, Feedback } from '@entities/feedback';
import FeedbackRow from '@features/feedback/ui/FeedbackRow/FeedbackRow';
import FeedbackHeader from '@features/feedback/ui/FeedbackHeader/FeedbackHeader';
import type { SortDirection } from '@type';

const statusComparator = (a: Feedback, b: Feedback, direction: SortDirection): number => {
    const cmp = compareFeedbackByStatusThenDate(a, b);
    return direction === 'ascending' ? cmp : -cmp;
};

const FeedbackTable: FC = () => {
    const { feedbacks, loading, error: feedbackError, deleteFeedback } = useFetchFeedbacks();
    const sortOptions = useMemo(
        () => ({
            initialKey: 'response_status' as const,
            initialDirection: 'ascending' as const,
            comparators: { response_status: statusComparator },
        }),
        [],
    );
    const { sortedData: sortedFeedbacks, handleSort, getSortArrow } = useSortedData(feedbacks || [], sortOptions);

    if (loading) return <div>{LOCALES.LOADING}</div>;
    if (feedbacks.length === 0 && !feedbackError) return <div>{LOCALES.WELCOME_MESSAGE}</div>;
    if (feedbackError) return <UnauthorizedMessage />;

    return (
        <div className={styles.FeedbackTable}>
            <h1>{FEEDBACK_HEADER.tableTitle}</h1>
            <table>
                <FeedbackHeader handleSort={handleSort} getSortArrow={getSortArrow} />
                <tbody>
                    {sortedFeedbacks.map((feedback) => (
                        <FeedbackRow key={feedback.id} feedback={feedback} deleteFeedback={deleteFeedback} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackTable;
