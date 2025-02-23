import {useCallback} from 'react';
import {useFeedbackContext} from '@app/providers/feedback/useFeedbackContext';
import {Feedback} from "@features/feedback/types/Feedback.types";

const useFeedbackByVacancyId = () => {
    const {feedbacks, error: feedbackError} = useFeedbackContext();

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