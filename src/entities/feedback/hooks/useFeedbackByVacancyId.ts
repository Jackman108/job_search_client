import { useCallback, useMemo } from 'react';
import { useFetchByType } from '@api';
import { formatAndSortData } from '@utils';
import { feedbackConfig } from '../config/feedbackConfig';
import { Feedback } from '../types/Feedback.types';
import { formatFeedbackDate } from '../utils/formatFeedbackDate';

/** Entity-level lookup so vacancies UI does not import features/feedback (A6). */
const useFeedbackByVacancyId = () => {
    const { fetchedData, error: feedbackError } = useFetchByType(feedbackConfig);

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
            return feedbacks.find((feedback) => feedback.vacancy_id === vacancyId);
        },
        [feedbacks, feedbackError],
    );

    return {
        getFeedbackByVacancyId,
        error: feedbackError,
    };
};

export default useFeedbackByVacancyId;
