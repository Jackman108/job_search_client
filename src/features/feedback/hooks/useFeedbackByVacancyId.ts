import {useCallback} from 'react';
import useFetchFeedbacks from "@features/feedback/hooks/useFetchFeedbacks";
import {Feedback} from "@entities/feedback";

const useFeedbackByVacancyId = () => {
    const {feedbacks, error: feedbackError} = useFetchFeedbacks();

    const getFeedbackByVacancyId = useCallback((vacancyId: number): Feedback | undefined => {
        if (feedbackError) {
            console.error('Ошибка при загрузке фидбеков:', feedbackError);
            return undefined;
        }

        if (!feedbacks) {
            console.warn('Фидбеки не загружены');
            return undefined;
        }

        return feedbacks.find(feedback => feedback.vacancy_id === vacancyId);
    }, [feedbacks, feedbackError]);

    return {
        getFeedbackByVacancyId,
        error: feedbackError,
    };
};

export default useFeedbackByVacancyId;