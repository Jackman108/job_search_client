import { useCallback, useMemo } from 'react';
import { useFetchByType } from '@api';
import { formatAndSortData } from '@utils';
import { useRefreshWhileHhJob } from '@hooks';
import type { HhJobKind } from '@type';
import { feedbackConfig } from '../config/feedbackConfig';
import { Feedback } from '../types/Feedback.types';
import { formatFeedbackDate } from '../utils/formatFeedbackDate';

const FEEDBACK_JOB_KINDS: readonly HhJobKind[] = ['getFeedback'];

/** Entity-level lookup so vacancies UI does not import features/feedback (A6). */
const useFeedbackByVacancyId = () => {
    const { fetchedData, error: feedbackError, loadData } = useFetchByType(feedbackConfig);
    useRefreshWhileHhJob(loadData, FEEDBACK_JOB_KINDS);

    const feedbacks: Feedback[] = useMemo(
        () =>
            fetchedData.feedback ? formatAndSortData(fetchedData.feedback, formatFeedbackDate, 'feedback_date') : [],
        [fetchedData.feedback],
    );

    const getFeedbackByVacancyId = useCallback(
        (vacancyId: number): Feedback | undefined => {
            if (feedbackError || !feedbacks.length) {
                return undefined;
            }
            // pg BIGINT often arrives as string — strict === missed vacancy↔feedback links.
            const want = Number(vacancyId);
            return feedbacks.find((feedback) => Number(feedback.vacancy_id) === want);
        },
        [feedbacks, feedbackError],
    );

    return {
        getFeedbackByVacancyId,
        error: feedbackError,
    };
};

export default useFeedbackByVacancyId;
